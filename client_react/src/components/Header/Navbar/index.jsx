import { Drawer } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import history from '../../../util/history';

import { BsChevronDown } from 'react-icons/bs';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';

import { setFlagSearchChange } from '../../../redux/actions';
import './styles.scss';

const navbarData = [
  {
    id: 1,
    name: 'Home',
    path: '/',
  },
  // {
  //   id: 2,
  //   name: 'Shop',
  //   path: '/shop',
  //   dropdownData: [
  //     {
  //       id: 1,
  //       name: 'Fresh food',
  //       data: [
  //         'Fruit & Nut',
  //         'Snack Foods',
  //         'organics Nut Gifts',
  //         'Non-Dairy',
  //         'Delicius Chiken Hotdogs',
  //       ],
  //     },
  //     {
  //       id: 2,
  //       name: 'MixedFruits',
  //       data: ['Oranges', 'Ghee Beverages', 'Ranch Salad', 'Fresh avocado', 'Fresh blueberry'],
  //     },
  //     {
  //       id: 3,
  //       name: 'Bananas & Plantains',
  //       data: [
  //         ' Fresh Gala',
  //         'fifts Mixed Fruits',
  //         'Fresh organic',
  //         'West Indian Onionsalad',
  //         'Vegetable tomato',
  //       ],
  //     },
  //     {
  //       id: 4,
  //       name: 'Apples Berries',
  //       data: [
  //         'Pears Produce',
  //         'fresh green orange',
  //         'blackberry 100% organic',
  //         'Vegetable Italian Salad',
  //         'Special Corn Noodels',
  //       ],
  //     },
  //   ],
  // },
  {
    id: 3,
    name: 'Products',
    path: '/products',
    // dropdownData: [
    //   {
    //     id: 1,
    //     name: 'Bestseller',
    //     img: 'https://cdn.shopify.com/s/files/1/0412/8151/9765/collections/banner4_560x350_crop_center.jpg?v=1595936653',
    //   },
    //   {
    //     id: 2,
    //     name: 'Special Product',
    //     img: 'https://cdn.shopify.com/s/files/1/0412/8151/9765/collections/banner6_560x350_crop_center.jpg?v=1595936651',
    //   },
    //   {
    //     id: 3,
    //     name: 'Featured Product',
    //     img: 'https://cdn.shopify.com/s/files/1/0412/8151/9765/collections/banner5_19e6fd2c-70b2-459d-b4d5-d7680262856a_560x350_crop_center.jpg?v=1595936691',
    //   },
    // ],
  },
  {
    id: 4,
    name: 'About Us',
    path: '/about',
  },
  {
    id: 5,
    name: 'Discount',
    path: '/discount',
  },
  {
    id: 6,
    name: 'Contact Us',
    path: '/contact',
  },

  {
    id: 7,
    name: 'Login',
    path: '/login',
  },

  {
    id: 8,
    name: 'Register',
    path: '/register',
  },
];

const Navbar = ({ setShowNavbar, showNavbar, setValue, setFlagSearchChange, authData }) => {
  const location = useLocation();
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const [isActive, setIsActive] = useState(1);
  const [isActiveMobile, setIsActiveMobile] = useState({});
  const handelNavbarClick = (id, path) => {
    setIsActive(id);
    history.push(path);
    setValue(''); //Xóa ô search khi chuyển trang
    setFlagSearchChange(false); //check ô search để điều chỉnh thanh Scroll
    if (window.innerWidth < 992) {
      setIsActiveMobile({
        idParentNavbar: id,
      });
    }
  };

  const handelCloseDrawer = () => {
    setShowNavbar(false);
    setIsActiveMobile({});
  };
  const renderNavbar = (data) => {
    return data.map((item, index) => (
      <li
        key={item.id}
        className={`navbar__item ${location.pathname === item.path ? 'navbar__item--active' : ''}`}
      >
        <button
          className="navbar__item--link button"
          onClick={() => handelNavbarClick(item.id, item.path)}
        >
          {!item.dropdownData ? (
            t(item.name)
          ) : (
            <>
              {t(item.name)} <BsChevronDown />
            </>
          )}
        </button>
        {item.dropdownData && (
          <ul
            className={`${
              !showNavbar
                ? 'dropdown'
                : `dropdown-mobile ${
                    isActiveMobile.idParentNavbar === item.id && 'dropdown-mobile--active'
                  }`
            } ${index === 2 && 'dropdown__collection'} `}
          >
            {item.dropdownData.map((itemDropdown) => (
              <li className="dropdown__item" key={itemDropdown.id}>
                {itemDropdown.img ? (
                  <>
                    <a href="#">
                      <img src={itemDropdown.img} alt="itemDropdown" className="dropdown__img" />
                    </a>
                    <h3 className="dropdown__title">{itemDropdown.name} </h3>
                  </>
                ) : (
                  <>
                    <h3
                      className="dropdown__title"
                      onClick={() =>
                        setIsActiveMobile({
                          ...isActiveMobile,
                          idChildrenNavbar: itemDropdown.id,
                        })
                      }
                    >
                      {itemDropdown.name}{' '}
                    </h3>
                    <div
                      className={
                        showNavbar &&
                        ` dropdown__item--mobile ${
                          isActiveMobile.idChildrenNavbar === itemDropdown.id &&
                          'dropdown__item--mobile-active'
                        }`
                      }
                    >
                      {itemDropdown.data.map((itemDropdownData, ind) => (
                        <p key={ind}>{itemDropdownData}</p>
                      ))}
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </li>
    ));
  };
  return (
    <>
      <nav className="navbar">
        <ul className="navbar__list">{renderNavbar(navbarData)}</ul>
        <div className="hot-line">
          {authData?.role === 'admin' && (
            <div className="header__admin" onClick={() => history.push('/admin')}>
              <MdOutlineAdminPanelSettings />
            </div>
          )}
          <div className="hot-line">
            <img
              src="https://cdn.shopify.com/s/files/1/0412/8151/9765/files/icon_contact_1d544c80-aa06-4dd2-a206-999b26d599fd.png?v=1592395268"
              alt="hotline"
            ></img>
            <div className="hot-line__text">
              <p>{t('Hotline')}:</p>
              <p>0123 456 789</p>
            </div>
          </div>
        </div>
      </nav>
      <Drawer
        placement="left"
        closable={false}
        onClose={() => {
          handelCloseDrawer();
        }}
        visible={showNavbar}
        width={'45%'}
      >
        <nav className="navbar">
          <ul className="navbar__list">{renderNavbar(navbarData)}</ul>
        </nav>
      </Drawer>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFlagSearchChange: (params) => dispatch(setFlagSearchChange(params)),
  };
};
export default connect(null, mapDispatchToProps)(Navbar);
