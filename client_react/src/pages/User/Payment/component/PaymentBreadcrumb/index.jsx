import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import history from '../../../../../util/history';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import './styles.scss';
const PaymentBreadcrumb = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div className="payment__breadcrumb">
      <span className=" payment__breadcrumb--active" onClick={() => history.push('/cart')}>
        {t('payments.breadcrumb.Cart')}
      </span>
      <FiChevronRight />
      <span className="payment__breadcrumb--active">{t('payments.breadcrumb.Information')}</span>
      <FiChevronRight />
      <span
        className={` ${
          location.pathname === '/shipping' || location.pathname === '/payment'
            ? 'payment__breadcrumb--active'
            : ''
        }`}
      >
        {t('payments.breadcrumb.Shipping')}
      </span>
      <FiChevronRight />
      <span className={` ${location.pathname === '/payment' ? 'payment__breadcrumb--active' : ''}`}>
        {t('payments.breadcrumb.Payment')}
      </span>
    </div>
  );
};

export default PaymentBreadcrumb;
