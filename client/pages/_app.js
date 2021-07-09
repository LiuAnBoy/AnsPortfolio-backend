import React from "react";
import { Provider } from "react-redux";
import { useStore } from "../store";
import NavBar from "../components/layout/navBar";
import Footer from "../components/sections/footer";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp;
