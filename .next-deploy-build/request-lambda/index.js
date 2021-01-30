"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const prerender_manifest_json_1 = __importDefault(require("./prerender-manifest.json"));
const manifest_json_1 = __importDefault(require("./manifest.json"));
const compat_1 = __importDefault(require("./compat"));
const addS3HostHeader = (req, s3DomainName) => {
    req.headers['host'] = [{ key: 'host', value: s3DomainName }];
};
const isDataRequest = (uri) => uri.startsWith('/_next/data');
const isApiRequest = (uri) => uri.startsWith('/api');
const getUriPageName = (uri) => (uri === '/' ? '/index' : uri);
const getUriKey = (uri) => (uri === '/index' ? '/' : uri);
const normalizeS3OriginDomain = (s3Origin) => {
    if (s3Origin.region === 'us-east-1') {
        return s3Origin.domainName;
    }
    if (!s3Origin.domainName.includes(s3Origin.region)) {
        const regionalEndpoint = s3Origin.domainName.replace('s3.amazonaws.com', `s3.${s3Origin.region}.amazonaws.com`);
        return regionalEndpoint;
    }
    return s3Origin.domainName;
};
const router = (manifest) => {
    const { pages: { ssr, html, apis }, } = manifest;
    const allDynamicRoutes = { ...ssr.dynamic, ...html.dynamic, ...apis.dynamic };
    return (uri) => {
        const normalizedUri = isDataRequest(uri)
            ? uri.replace(`/_next/data/${manifest.buildId}`, '').replace('.json', '')
            : uri;
        if (ssr.nonDynamic[normalizedUri]) {
            return ssr.nonDynamic[normalizedUri];
        }
        else if (apis.nonDynamic[normalizedUri]) {
            return apis.nonDynamic[normalizedUri];
        }
        for (const route in allDynamicRoutes) {
            const { file, regex } = allDynamicRoutes[route];
            const re = new RegExp(regex, 'i');
            const pathMatchesRoute = re.test(normalizedUri);
            if (pathMatchesRoute) {
                return file;
            }
        }
        if (isApiRequest(uri)) {
            return null;
        }
        else if (html.nonDynamic['/404'] !== undefined) {
            return 'pages/404.html';
        }
        return 'pages/_error.js';
    };
};
const handler = async (event) => {
    const { request } = event.Records[0].cf;
    const uriKey = getUriKey(request.uri);
    const manifest = manifest_json_1.default;
    const prerenderManifest = prerender_manifest_json_1.default;
    const { pages, publicFiles } = manifest;
    const isStaticPage = pages.html.nonDynamic[uriKey];
    const isPublicFile = publicFiles[uriKey];
    const isPrerenderedPage = prerenderManifest.routes[request.uri];
    const origin = request.origin;
    const s3Origin = origin.s3;
    const isHTMLPage = isStaticPage || isPrerenderedPage;
    const normalizedS3DomainName = normalizeS3OriginDomain(s3Origin);
    s3Origin.domainName = normalizedS3DomainName;
    if (isHTMLPage || isPublicFile) {
        s3Origin.path = isHTMLPage ? '/static-pages' : '/public';
        addS3HostHeader(request, normalizedS3DomainName);
        if (isHTMLPage) {
            request.uri = `${getUriPageName(uriKey)}.html`;
        }
        return request;
    }
    const pagePath = router(manifest)(uriKey);
    if (!pagePath) {
        return {
            status: '404',
        };
    }
    if (pagePath.endsWith('.html')) {
        s3Origin.path = '/static-pages';
        request.uri = pagePath.replace('pages', '');
        addS3HostHeader(request, normalizedS3DomainName);
        return request;
    }
    const page = require(`./${pagePath}`);
    const { req, res, responsePromise } = compat_1.default(event.Records[0].cf);
    if (isApiRequest(uriKey)) {
        page.default(req, res);
    }
    else if (isDataRequest(uriKey)) {
        const { renderOpts } = await page.renderReqToHTML(req, res, 'passthrough');
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(renderOpts.pageData));
    }
    else {
        page.render(req, res);
    }
    return responsePromise;
};
exports.handler = handler;
