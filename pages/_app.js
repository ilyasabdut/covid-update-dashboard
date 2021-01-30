// import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-3.5.1.js"
        ></script>
        <script
          type="text/javascript"
          src="https://cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js"
        ></script>
        <script
          type="text/javascript"
          src="https://cdn.datatables.net/1.10.23/js/dataTables.bootstrap4.js"
        ></script>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        />

        <link
          href="https://cdn.datatables.net/1.10.23/css/dataTables.bootstrap4.css"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
