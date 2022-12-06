import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import Head from "next/head";

import "../styles/globals.css";
import AuthProvider from "../src/context/AuthProvider";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        type="module"
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
      ></Script>
      <Script
        noModule
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
      ></Script>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Prilaku — Managing habits made easy</title>
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
