import { Select } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Route } from 'react-router-dom';
import English from '../assets/images/english.svg';
import VietNam from '../assets/images/vietnam.svg';
import Admin from '../pages/Admin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';
const { Option } = Select;

function PrivateLayout({ component: Component, role, ...props }) {
  const { t, i18n } = useTranslation();

  const userInfo = JSON.parse(localStorage.getItem('profile'));
  if (userInfo && userInfo.phoneNumber) {
    if (userInfo.role !== 'admin') {
      return <Redirect to="/" />;
    }
  } else {
    return <Redirect to="/login" />;
  }

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Route
      {...props}
      render={(routerProps) => (
        <>
          <div className="main">
            <div className="admin">
              <div className="admin__nav">
                <Admin {...routerProps} />
              </div>
              <div className="admin__wrapper">
                <div className="container header__language admin__language">
                  <span className="mr-16">{t('language.name')}: </span>
                  <Select onChange={changeLanguage} defaultValue="vi">
                    <Option value="en">
                      <img src={English} className="header__language--img" alt="" />
                      {t('language.english')}
                    </Option>
                    <Option value="vi">
                      <img src={VietNam} className="header__language--img" alt="" />
                      {t('language.vietnam')}
                    </Option>
                  </Select>
                </div>
                <Component {...routerProps} />
              </div>
            </div>
            <ToastContainer />
          </div>
        </>
      )}
    />
  );
}

export default PrivateLayout;
