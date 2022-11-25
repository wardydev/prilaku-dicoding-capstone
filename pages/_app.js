import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";

import "../styles/globals.css";
import AuthProvider from "../src/context/AuthProvider";
import { getJsonToken } from "../src/utils/functions";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (JSON.parse(getJsonToken()) === null && router.pathname !== "/") {
      router.push("/login");
    }
  }, [router.pathname]);
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
