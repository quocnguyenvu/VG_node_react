import React from 'react';
import { Route } from 'react-router-dom';
import { Col, Row } from 'antd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';
import InfoCart from '../components/InfoCart';
function PaymentLayout({ component: Component, role, ...props }) {
  return (
    <Route
      {...props}
      render={(routerProps) => (
        <>
          <div className=" payment-layout">
            <div className="main container">
              <Row justify="center">
                <Col lg={14} md={18} xs={24} className="payment__left">
                  <Component {...routerProps} />
                </Col>
                <Col lg={10} md={18} xs={24}>
                  <InfoCart />
                </Col>
              </Row>
            </div>
            <ToastContainer />
          </div>
        </>
      )}
    />
  );
}

export default PaymentLayout;
