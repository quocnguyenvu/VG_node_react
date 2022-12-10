import React, { useEffect, useState } from 'react';
import PaymentBreadcrumb from './component/PaymentBreadcrumb';
import { Radio } from 'antd';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AiFillHome } from 'react-icons/ai';
import { getBill } from '../../../redux/actions';
import history from '../../../util/history';
import './styles.scss';

const Shipping = ({ getBill, billData }) => {
  document.title = 'Vegana | Trang ship';
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const [infoPayment, setUser] = useState(JSON.parse(localStorage.getItem('infoPayment')));

  return (
    <div className="payment-page fadeIn">
      <div className="container payment__container">
        <section className="shipping">
          <div className="payment-page__title" onClick={() => history.push('/')}>
            <AiFillHome /> <h1 className="information__title">vegina-store</h1>
          </div>
          <PaymentBreadcrumb />
          <div className="shipping__container">
            <div className="shipping__info shipping__content">
              <div className=" shipping__content--item">
                <div className="shipping__info--inner">
                  <h4>{t('payments.shipping.Contact')}</h4>
                  <p>{infoPayment?.phone}</p>
                </div>
                <button className="button" onClick={() => history.push('/infoPayment')}>
                  {t('payments.shipping.Change')}
                </button>
              </div>
              {infoPayment?.email && (
                <div className=" shipping__content--item   ">
                  <div className="shipping__info--inner">
                    <h4>{t('Email')}</h4>
                    <p>{infoPayment?.email}</p>
                  </div>
                  <button className="button" onClick={() => history.push('/infoPayment')}>
                    {t('payments.shipping.Change')}
                  </button>
                </div>
              )}
              <div className=" shipping__content--item">
                <div className="shipping__info--inner">
                  <h4>{t('payments.shipping.Ship to')}</h4>
                  <p>{infoPayment?.address}</p>
                </div>
                <button className="button" onClick={() => history.push('/infoPayment')}>
                  {t('payments.shipping.Change')}
                </button>
              </div>
            </div>

            <div className="shipping__title">
              <h3>{t('payments.shipping.Shipping method')}</h3>
            </div>
            <div className="shipping__method shipping__content  ">
              <div className="shipping__content--item">
                <Radio checked>{t('payments.shipping.Standard')}</Radio>
                <p>20.000 VND</p>
              </div>
            </div>
            <div className="shipping__btn">
              <button
                className="button  button-animation--1 button-round--lg "
                onClick={() => history.push('/payment')}
              >
                <span> {t('payments.shipping.Continue to payment')}</span>
              </button>
              <button
                className="button button-round button-transparent"
                onClick={() => history.push('/infoPayment')}
              >
                <span> {t('payments.shipping.Return to information')}</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { billData } = state.paymentReducer;

  return { billData };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBill: (params) => dispatch(getBill(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Shipping);
