import React from 'react';
import { Provider } from 'react-redux';
import { useStore } from '../store';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import '../styles/globals.css';

/* eslint "react/prop-types": "off" */
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
