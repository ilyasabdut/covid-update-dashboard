import "../styles/globals.css";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        />
        <link
          href="https://cdn.datatables.net/1.10.23/css/dataTables.bootstrap4.css"
          rel="stylesheet"
        />
      </Head>
      <Script
        src="https://code.jquery.com/jquery-3.5.1.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.datatables.net/1.10.23/js/dataTables.bootstrap4.js"
        strategy="beforeInteractive"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
