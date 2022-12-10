import { Col, Row, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiCheckSquare } from 'react-icons/fi';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getBill } from '../../../redux/actions';
import history from '../../../util/history';
import './styles.scss';

const Success = ({ match, getBill, billData }) => {
  const billId = match.params.id;
  const { t } = useTranslation();

  const bill = billData?.data?.bill;
  const billDetails = billData?.data?.billDetails;

  useEffect(() => {
    document.title = 'Vegana | Trang Success';
    getBill({ billId });
  }, []);

  return (
    <>
      {billData.load ? (
        <div className="loading">
          <Spin />
        </div>
      ) : (
        <section className="success fadeIn">
          <div className="container">
            <Row justify="center">
              <Col lg={14} md={18} xs={24}>
                <div className=" success__container">
                  <h2 className="success__title">
                    <FiCheckSquare /> {t('success.Order Success')}
                  </h2>
                  <p className="success__thank">
                    {t('success.Thanks')} <span>{t('success.Order Management')}</span>
                  </p>
                  <div className="success__management">
                    <h3>#Vegana-{`${billId.slice(-8).toUpperCase()}`}</h3>
                    <button className="button" onClick={() => history.push('/profile')}>
                      {t('success.Order Management')}
                    </button>
                  </div>
                  <div className="success__info">
                    <div className="success__info--item">
                      <h4>{t('success.Receiver')}: </h4>
                      <p>
                        {bill?.name}, {bill?.phoneNumber}
                      </p>
                    </div>
                    <div className="success__info--item">
                      <h4>{t('success.Delivery address')}: </h4>
                      <p>{bill?.address}</p>
                      <span>({t('success.Staff will call to confirm before delivery')})</span>
                    </div>
                    <div className="success__info--item">
                      <h4>{t('success.Estimated delivery time')}: </h4>
                      <p>1-2 {t('success.day')}</p>
                    </div>
                    <div className="success__info--item">
                      <h4>{t('success.Total amount')}: </h4>
                      <p className="text-danger"> {bill?.total.toLocaleString()} VND</p>
                    </div>
                  </div>
                  <div className="success__payment">
                    <h4>{t('success.Payment type')}:</h4>
                    <p>{bill?.payment}</p>
                  </div>
                  <div className="success__cancel">
                    <button
                      onClick={() => history.push('/profile')}
                      className="button button-round--lg button-transparent"
                    >
                      {t('success.Order Cancellation')}
                    </button>
                  </div>
                  <div className="success__contact">
                    <p>
                      {t('success.When you need help, please call')} <span>1900 8198</span>{' '}
                      (7h30-22h)
                    </p>
                  </div>
                  <div className="success__cart">
                    <div className="success__cart--title">
                      <h3>{t('success.Products purchased')}:</h3>
                    </div>
                    <table className="success__cart--content">
                      {billDetails?.map((item) => (
                        <tr
                          className="success__cart--item"
                          onClick={() => history.push(`/product/${item?.id}`)}
                          key={item.id}
                        >
                          <td className="success__cart--img">
                            <img src={item.productId?.imgs[0]} alt="cart img"></img>
                          </td>
                          <td className="success__cart--name">
                            <h4>{item.productId?.name}</h4>
                            <p>
                              <span>{t('success.amount')}: </span>
                              <span>{item.quantity} </span>
                            </p>
                          </td>
                          <td className="success__cart--price text-danger">
                            {(item.productId?.price * item.quantity).toLocaleString()} VND
                          </td>
                        </tr>
                      ))}
                    </table>
                  </div>
                  <div className="success__btn">
                    <button className="button" onClick={() => history.push('/')}>
                      {t('success.return to home page')}
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <ToastContainer />
        </section>
      )}
    </>
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
export default connect(mapStateToProps, mapDispatchToProps)(Success);
