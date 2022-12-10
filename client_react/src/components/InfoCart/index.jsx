import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getCartData, getDiscountUser } from '../../redux/actions';
import SearchDiscount from './Search';

import './styles.scss';

const InfoCart = ({
  getCartData,
  cartData,
  getDiscountUser,
  discountUserData,
  totalDiscountUser,
}) => {
  const location = useLocation();
  const { t } = useTranslation();
  const [searchKey, setSearchKey] = useState('');
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [discount, setDiscount] = useState();

  useEffect(() => {
    getCartData();
  }, [getCartData]);

  useEffect(() => {
    if (location.pathname === '/payment') getDiscountUser({ page: 1, searchKey });
  }, [searchKey, isShowSearch, location, getDiscountUser]);

  useEffect(() => {
    if (location.pathname !== '/payment') {
      setDiscount({});
      setSearchKey('');
      setIsShowSearch(false);
    }
  }, [location]);

  const renderCartData = (cartData) => {
    return cartData?.cartDetails?.map((item, index) => {
      const { productId } = item;
      return (
        <tr className="infoCart__cart--item" key={index}>
          <td className="infoCart__cart--img">
            <img src={productId.imgs[0]} alt="anh"></img>
            <span className="infoCart__cart--amount">{item.quantity}</span>
          </td>
          <td className="infoCart__cart--name">
            <h5>{productId.name}</h5>
            {productId.unit && <p>{productId.unit}</p>}
          </td>
          <td className="infoCart__cart--price">
            ${(item.quantity * productId.price).toLocaleString()} VND
          </td>
        </tr>
      );
    });
  };

  const handleCalculateToTal = ({ check }) => {
    let total = 0;
    cartData?.cartDetails?.forEach((element) => {
      total += parseInt(element.productId.price * element.quantity);
    });
    total += total * (check ? 0.1 : 0);

    if (check && (discount?.sale || discount?.amount)) {
      if (discount?.sale) {
        total = total * (1 - discount?.sale / 100);
      } else {
        total -= discount?.amount;
      }
    }
    const payment = JSON.parse(localStorage.getItem('infoPayment'));
    localStorage.setItem('infoPayment', JSON.stringify({ ...payment, total: total + 20000 }));

    return total;
  };

  return (
    <section className="infoCart">
      <div className=" infoCart__container">
        <table className="infoCart__cart">{renderCartData(cartData)}</table>
        <div className="infoCart__discount">
          <SearchDiscount
            setSearchKey={setSearchKey}
            searchKey={searchKey}
            totalDiscountUser={totalDiscountUser}
            discountUserData={discountUserData}
            setIsShowSearch={setIsShowSearch}
            isShowSearch={isShowSearch}
            setDiscount={setDiscount}
          />
        </div>
        <div className="infoCart__price">
          <div className="infoCart__price--item">
            <h4>{t('infoCart.Subtotal')}</h4>
            <p>{handleCalculateToTal({ check: false }).toLocaleString()}</p>
          </div>
          <div className="infoCart__price--item">
            <h4>VAT</h4>
            <p>{parseInt(handleCalculateToTal({ check: false }) * 0.1).toLocaleString()}</p>
          </div>
          <div className="infoCart__price--item">
            <h4>{t('infoCart.Discount')}</h4>
            <p>
              {location.pathname === '/payment' && discount ? (
                <span>
                  {discount?.sale || discount?.amount ? '-' : ''}
                  {discount?.sale || discount?.amount?.toLocaleString()}
                  {discount?.sale || discount?.amount ? (discount?.amount ? 'VND' : '%') : 0}
                </span>
              ) : (
                0
              )}
            </p>
          </div>
          <div className="infoCart__price--item">
            <h4>{t('infoCart.Shipping cost')}</h4>
            <p>
              {location.pathname === '/shipping' || location.pathname === '/payment'
                ? parseInt(20000).toLocaleString()
                : t('infoCart.Calculated at next step')}
            </p>
          </div>
          <div className="infoCart__price--total">
            <h4>{t('infoCart.Total')}</h4>
            <p>
              VND{' '}
              <span>
                {(
                  handleCalculateToTal({ check: true }) +
                  (location.pathname === '/shipping' || location.pathname === '/payment'
                    ? 20000
                    : 0)
                ).toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  const { cartData } = state.cartReducer;
  const { discountUserData, totalDiscountUser } = state.discountReducer;

  return {
    cartData,
    discountUserData,
    totalDiscountUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCartData: (params) => dispatch(getCartData(params)),
    getDiscountUser: (params) => dispatch(getDiscountUser(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InfoCart);
