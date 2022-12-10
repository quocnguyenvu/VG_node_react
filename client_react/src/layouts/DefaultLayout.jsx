import React from 'react';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './styles.scss';

function DefaultLayout({ component: Component, role, ...props }) {
  return (
    <Route
      {...props}
      render={(routerProps) => (
        <>
          <Header {...routerProps} />
          <div className="main">
            <Component {...routerProps} />
          </div>
          <Footer />
          <ToastContainer />
        </>
      )}
    />
  );
}
export default DefaultLayout;
