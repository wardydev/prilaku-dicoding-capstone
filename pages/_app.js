import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";

import "../styles/globals.css";
import AuthProvider from "../src/context/AuthProvider";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
