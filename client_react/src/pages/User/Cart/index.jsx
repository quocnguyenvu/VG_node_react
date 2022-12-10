import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import history from '../../../util/history';
import Breadcrumb from '../../../components/Breadcrumb';
import { Col, Row, Select, Input, Modal } from 'antd';
import CartItem from './CartItem';
import { useTranslation } from 'react-i18next';
import './styles.scss';
import { clearCart, getCartData } from '../../../redux/actions';

const Cart = ({ cartData, clearCart, getCartData }) => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [totalItem, setTotalItem] = useState(0);
  const { Option } = Select;

  useEffect(() => {
    if (localStorage.getItem('profile')) getCartData();
  }, []);

  useEffect(() => {
    const count = cartData?.cartDetails?.reduce(
      (total, currentValue) => {
        return parseInt(total) + currentValue.quantity;
      },
      [0]
    );
    setTotalItem(count);
  }, [cartData]);

  const handleCalculateToTal = () => {
    let total = 0;
    cartData?.cartDetails?.forEach((element) => {
      total += parseInt(element.productId.price * element.quantity);
    });
    return total;
  };

  return (
    <div className="cart fadeIn">
      <Breadcrumb title="Cart" />
      <div className="container cart__container">
        {cartData?.cartDetails?.length ? (
          <Row gutter={[32, 24]} justify="end">
            <Col xl={17} lg={16} xs={24}>
              <section className="cart__product">
                <div className="cart__product--title">
                  <h2>{t('cart.My Cart')}:</h2>
                  <p>
                    {totalItem} {t('cart.item')}
                  </p>
                </div>
                <table className="cart__table">
                  <tbody className="cart__product--list">
                    {cartData?.cartDetails?.map((item) => (
                      <CartItem item={item} key={item._id} />
                    ))}
                  </tbody>
                </table>
                <div className="cart__product--bottom">
                  <span></span>
                  <button
                    className="button button-round--lg button-primary"
                    onClick={() => history.push('/products')}
                  >
                    {t('cart.Continue Shopping')}
                  </button>
                  <button
                    className="button button-round--lg button-transparent"
                    onClick={() => setIsModalVisible(true)}
                  >
                    {t('cart.Clear Cart')}
                  </button>
                </div>
              </section>
            </Col>
            <Col xl={7} lg={8} md={12} sm={16} xs={24}>
              <section className="cart__price">
                <div className="cart__img">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0412/8151/9765/files/banner10-min.jpg?v=1593256899"
                    alt="img"
                  />
                </div>
                <div className="cart__price--subtotal">
                  <div className="cart__price--subtotal-item">
                    <h4>{t('cart.Subtotal')}</h4>
                    <p>{handleCalculateToTal().toLocaleString()} VND</p>
                  </div>
                  <div className="cart__price--subtotal-item">
                    <h4>VAT: </h4>
                    <p>{(handleCalculateToTal() * 0.1).toLocaleString()} VND</p>
                  </div>
                </div>
                {/* <div className="cart__price--info">
                  <h2 className="cart__price--title">{t('cart.Shipping Info')}</h2>
                  <div className="cart__price--info-item">
                    <p>{t('cart.Country')}</p>
                    <Select defaultValue="vi" style={{ width: '100%' }}>
                      <Option value="vi">
                        <img src={VietNam} alt="VietNam" className="header__language--img" />
                        <span>Viet Nam</span>
                      </Option>
                      <Option value="en">
                        <img src={English} alt="English" className="header__language--img" />
                        <span>England</span>
                      </Option>
                    </Select>
                  </div>
                  <div className="cart__price--info-item">
                    <p>{t('cart.Zip/Postal code')}</p>
                    <Input placeholder="Zip/Postal code" />
                  </div>
                </div> */}
                <div className="cart__price--total">
                  <h4>{t('cart.Total')}</h4>
                  <p>{(handleCalculateToTal() * 1.1).toLocaleString()} VND</p>
                </div>
                <div className="cart__price--button">
                  <button
                    className="button button-round--lg button-primary"
                    onClick={() => history.push('/infoPayment')}
                  >
                    {t('cart.Checkout')}
                  </button>
                </div>
              </section>
            </Col>
          </Row>
        ) : (
          <div className="cart__nonProduct ">
            <div className="cart__nonProduct-img text-center">
              <img src="https://i.imgur.com/Drj57qu.png" alt="nonProduct" />
            </div>
            <div className="cart__nonProduct-btn ">
              <p>{t('cart.The shopping cart has no products')}</p>
              <button
                className="button button-round--lg button-primary"
                type="button"
                onClick={() => history.push('/products')}
              >
                {t('cart.Continue Shopping')}
              </button>
            </div>
          </div>
        )}
      </div>
      <Modal
        title={t('cart.Do you want to delete all products')}
        visible={isModalVisible}
        onOk={() => {
          clearCart({ cartId: cartData.cart._id });
          setIsModalVisible(false);
        }}
        onCancel={() => setIsModalVisible(false)}
      ></Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { cartData } = state.cartReducer;
  return {
    cartData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: (params) => dispatch(clearCart(params)),
    getCartData: (params) => dispatch(getCartData(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
