import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { getOrderDetail } from '../../../../redux/actions';
import { internationalDateTime } from '../../../../util/dateTime';
import history from '../../../../util/history';
import './styles.scss';

function OrderDetail({ match, orderDetail, getOrderDetail }) {
  useEffect(() => {
    document.title = 'Vegana | Trang Chi tiết đơn đặt hàng';
    getOrderDetail({ id: match.params.id });
  }, []);

  const { bill, billDetails } = orderDetail;
  const { t } = useTranslation();

  const title = [
    { id: 1, title: 'STT' },
    { id: 2, title: t('admin.order.Image') },
    { id: 3, title: t('admin.order.Name') },
    { id: 4, title: t('admin.order.Quantity') },
    { id: 5, title: t('admin.order.Price') },
  ];

  const renderPaymentCode = (id) => {
    let str = id.slice(-8).toUpperCase();
    return `Vegana-${str}`;
  };

  return (
    <section className="detail">
      <div className="detail__container">
        <h1 className="detail__title">{t('admin.order.ORDER DETAIL')}</h1>
        {bill && (
          <>
            <div className="detail__wrapper">
              <h3 className="detail__subtitle">{t('admin.order.Payment Code')}</h3>
              <p>{`#${renderPaymentCode(bill?.id)}`}</p>
            </div>
            <div className="detail__wrapper">
              <h3 className="detail__subtitle">{t('admin.order.Order name')}</h3>
              <p>{bill?.userId?.fullName}</p>
            </div>
            {bill?.userId?.email && (
              <div className="detail__wrapper">
                <h3 className="detail__subtitle">Email</h3>
                <p>{bill?.userId?.email}</p>
              </div>
            )}
            <div className="detail__wrapper">
              <h3 className="detail__subtitle">{t('admin.order.Date Time')}</h3>
              <p>{internationalDateTime(bill?.dateCreate)}</p>
            </div>
            <div className="detail__wrapper">
              <h3 className="detail__subtitle">{t('admin.order.Recipient name')}</h3>
              <p>{bill?.name}</p>
            </div>
            <div className="detail__wrapper">
              <h3 className="detail__subtitle">{t('admin.order.Phone Number')}</h3>
              <p>{bill?.phoneNumber}</p>
            </div>
            <div className="detail__wrapper">
              <h3 className="detail__subtitle">{t('admin.order.Address')}</h3>
              <p>{bill?.address}</p>
            </div>
            <div className="detail__wrapper">
              <h3 className="detail__subtitle">{t('admin.order.Total Price')}</h3>
              <p>{`${bill?.total.toLocaleString()} VND`}</p>
            </div>
            <div className="detail__wrapper">
              <h3 className="detail__subtitle">{t('admin.order.Payment Status')}</h3>
              <p>
                {!!bill?.isCompleted || bill?.status === 'Đã giao hàng'
                  ? 'Đã thanh toán'
                  : 'Chưa thanh toán (Ship COD)'}
              </p>
            </div>
            <div className="detail__wrapper">
              <h3 className="detail__subtitle">{t('admin.order.Order Status')}</h3>
              <p>{bill?.status}</p>
            </div>
          </>
        )}
        <div className="detail__wrapper">
          <h3 className="detail__subtitle">{t('admin.order.Products')}</h3>
          <div className="admin__listUser--tableNormal">
            <table className="detail__table">
              <thead>
                <tr>
                  {title.map((item) => (
                    <td key={item.id}>{item.title}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {billDetails?.length &&
                  billDetails?.map((item, index) => (
                    <tr className="table__row" key={item.id}>
                      <td>{index + 1}</td>
                      <td>
                        <img src={item.productId?.imgs[0]} alt="img" className="detail__img" />
                      </td>
                      <td>{item?.productId?.name}</td>
                      <td>{item?.quantity}</td>
                      <td>{`${item?.productId?.price.toLocaleString()} VND`}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="detail__button">
          <button
            type="button"
            className="button button-round--lg button-primary"
            onClick={() => history.push('/admin/listOrder')}
          >
            {t('admin.order.GO TO LIST ORDER')}
          </button>
        </div>
      </div>
    </section>
  );
}

// export default OrderDetail;
const mapStateToProps = (state) => {
  const { orderDetail } = state.paymentReducer;
  return {
    orderDetail,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getOrderDetail: (params) => dispatch(getOrderDetail(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
