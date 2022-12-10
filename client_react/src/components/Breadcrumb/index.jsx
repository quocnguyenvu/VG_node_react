import React from 'react';
import './styles.scss';
import { useTranslation } from 'react-i18next';
const Breadcrumb = ({ title }) => {
  const { t } = useTranslation();
  return (
    <section className="breadcrumb">
      <div
        className="breadcrumb__container"
        style={{
          backgroundImage:
            "url('https://cdn.shopify.com/s/files/1/0412/8151/9765/files/breadcrumb.jpg?v=1593258636')"
        }}
      >
        <div className="breadcrumb__content">
          <span>{t('Home')}</span>
          <span className="breadcrumb__text">{t(title)}</span>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
