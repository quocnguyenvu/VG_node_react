import React, { useState, useEffect } from 'react';
import { Select, Modal } from 'antd';
import { connect } from 'react-redux';
import { getCartData, clearCart, clearCountCart } from '../../redux/actions';
import { useLocation } from 'react-router-dom';

import history from '../../util/history';
import logo from '../../assets/images/log.jpg';
import VietNam from '../../assets/images/vietnam.svg';
import English from '../../assets/images/english.svg';
import { useTranslation } from 'react-i18next';

import { AiOutlineUserAdd, AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { GiHamburgerMenu, GiExitDoor } from 'react-icons/gi';
import { toastComingSoon } from '../../util/toast';

import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';

import Navbar from './Navbar';
import Search from '../Search';

const { Option } = Select;

const Header = ({ getCartData, cartData, userDataEdited, clearCountCart }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [totalItemInCart, setTotalItemInCart] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false);
  const [authData, setAuthData] = useState();
  const [value, setValue] = useState(''); //State lưu từ nhập vào từ ô search

  useEffect(() => {
    if (authData) getCartData();
  }, [authData]);

  useEffect(() => {
    setTotalItemInCart(cartData?.cartDetails?.length);
  }, [cartData]);

  useEffect(() => {
    setAuthData(() => JSON.parse(localStorage.getItem('profile')));
  }, [location, userDataEdited]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    history.push('/login');
    localStorage.clear();
    clearCountCart();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // Để về trang Home và xóa ô search
  const handleClickLogo = () => {
    setValue('');
    history.push('/');
  };

  return (
    <header className="header">
      <section className="header__top">
        <div className="container header__top--container">
          <div className="header__language">
            <span>{t('language.name')}: </span>
            <Select onChange={changeLanguage} defaultValue="vi">
              <Option value="vi">
                <img src={VietNam} className="header__language--img" />
                {t('language.vietnam')}
              </Option>
              <Option value="en">
                <img src={English} className="header__language--img" />
                {t('language.english')}
              </Option>
            </Select>
          </div>
          <div className="header__text">
            <span className="header__text--animation">{t('header text.free')}</span>{' '}
            {t('header_text.order')}
          </div>
        </div>
      </section>
      <section className="header__main">
        <div className="container header__main--container">
          <div onClick={handleClickLogo} className="logo">
            <img src={logo} alt="logo"></img>
          </div>
          <Search value={value} setValue={setValue} />
          <div className="header__widget">
            <div
              className="header__widget--item icon-hamburger "
              onClick={() => setShowNavbar(true)}
            >
              <GiHamburgerMenu />
            </div>
            <div className="header__widget--account">
              {authData ? (
                <>
                  <div className="header__widget--item">
                    <GiExitDoor onClick={showModal} />
                    <Modal
                      title="Notification"
                      visible={isModalVisible}
                      onOk={handleOk}
                      onCancel={handleCancel}
                    >
                      <p>Do you want to sign out?</p>
                    </Modal>
                  </div>
                  <div
                    onClick={() => history.push('/profile')}
                    className="header__widget--account-content"
                  >
                    <div className="user-avatar">
                      <img src={authData?.avatar} alt="avatar" />
                    </div>
                    <p className="header__widget--account-title">{authData?.fullName}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="header__widget--item">
                    <AiOutlineUserAdd />
                  </div>
                  <div className="header__widget--account-content">
                    <p className="header__widget--account-title">{t('Account')}</p>
                    <p>
                      <span
                        onClick={() => history.push('/register')}
                        className="header__widget--account-text"
                      >
                        {t('Register')}
                      </span>
                      <span
                        onClick={() => history.push('/login')}
                        className="header__widget--account-text"
                      >
                        {t('Login')}
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>
            <div onClick={toastComingSoon} className="header__widget--item">
              <AiOutlineHeart />
              <span className="header__widget--item-count">0</span>
            </div>
            <div className="header__widget--item" onClick={() => history.push('/cart')}>
              <HiOutlineShoppingBag />
              {
                <span className="header__widget--item-count">
                  {totalItemInCart ? totalItemInCart : 0}
                </span>
              }
            </div>
          </div>
        </div>
      </section>
      <section className="header__navbar">
        <div className="container ">
          <Navbar
            showNavbar={showNavbar}
            setShowNavbar={setShowNavbar}
            setValue={setValue}
            authData={authData}
          />
        </div>
      </section>
    </header>
  );
};

const mapStateToProps = (state) => {
  const { cartData } = state.cartReducer;
  const { userDataEdited, infoUser } = state.accountReducer;
  return {
    userDataEdited,
    cartData,
    infoUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCartData: (params) => dispatch(getCartData(params)),
    clearCountCart: (params) => dispatch(clearCountCart(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
