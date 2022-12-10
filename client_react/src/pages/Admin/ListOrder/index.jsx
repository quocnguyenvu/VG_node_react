import { Empty, Input, Modal, Pagination, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { deletePayments, getPayments, updatePayments } from '../../../redux/actions';
import Row from './components/Row/index';
import './styles.scss';

const arrStatus = [
  { id: 1, value: 'Đợi xác nhận' },
  { id: 2, value: 'Đã xác nhận' },
  { id: 3, value: 'Đang vận chuyển' },
  { id: 4, value: 'Đã giao hàng' },
  { id: 5, value: 'Đã hủy' },
  { id: 6, value: 'Tất cả' },
];

function ListOrder({
  paymentsData,
  getPayments,
  deleteData,
  deletePayments,
  updateData,
  updatePayments,
}) {
  const { bills, total } = paymentsData;

  const { Option } = Select;
  const { Search } = Input;

  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState('');
  const [searchKey, setSearchKey] = useState();
  const [sort, setSort] = useState('');
  const typingTimeoutRef = useRef(null);
  const { t } = useTranslation();

  const title = [
    { id: 1, title: 'STT' },
    { id: 2, title: t('admin.order.Payment Code') },
    { id: 3, title: t('admin.order.User Name') },
    { id: 4, title: t('admin.order.Total Price') },
    { id: 5, title: t('admin.order.Date Time') },
    { id: 6, title: t('admin.order.Status') },
    { id: 7, title: t('admin.order.Action') },
  ];

  useEffect(() => {
    document.title = 'Vegana | Trang Quản lý đơn đặt hàng';
    getPayments({
      page: current,
      limit: 10,
      search: searchKey,
      status: sort,
    });
  }, [current, searchKey, sort, deleteData, updateData]);

  const handleChangeStatus = (value, newID) => {
    updatePayments({
      id: newID,
      status: value,
    });
  };

  const handleClickDelete = (paymentCode, id) => {
    Modal.confirm({
      title: 'Confirm',
      content: (
        <p>
          {t('admin.order.payment delete')}{' '}
          <span style={{ fontWeight: 600 }}>{`#${paymentCode}`}</span> ?
        </p>
      ),
      okText: 'OK',
      cancelText: 'CANCEL',
      onOk() {
        deletePayments({ id });
      },
      onCancel() {},
    });
  };

  const handleClickCancel = (paymentCode, id) => {
    Modal.confirm({
      title: 'Confirm',
      content: (
        <p>
          {t('admin.order.payment cancel')}{' '}
          <span style={{ fontWeight: 600 }}>{`#${paymentCode}`}</span> ?
        </p>
      ),
      okText: 'OK',
      cancelText: 'CANCEL',
      onOk() {
        updatePayments({
          id,
          status: 'Đã hủy',
        });
      },
      onCancel() {},
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      const formValue = {
        search: value,
      };
      setSearchKey(formValue.search);
    }, 1000);
  };

  const handleChangeSort = (value) => {
    setSort(value);
  };

  return (
    <section className="admin__listUser admin__products fadeIn">
      <div className="container">
        <div className="order__filter">
          <div className="order__sort">
            <h3 className="order__sort--title">{t('admin.order.By Sort')}</h3>
            <Select
              showSearch
              style={{ width: 160 }}
              optionFilterProp="children"
              placeholder={t('admin.order.Select a status')}
              onChange={handleChangeSort}
            >
              {arrStatus.map((item, index) => (
                <Option value={item.value} key={index}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </div>
          <div className="order__search">
            <Search
              placeholder={t('admin.order.Search')}
              value={search}
              onChange={handleChange}
              enterButton
            />
          </div>
        </div>
        <div className="admin__listUser--tableNormal">
          <table className="table">
            <thead>
              <tr>
                {title.map((item) => (
                  <td key={item.id}>{item.title}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {bills?.length ? (
                bills?.map((item, index) => (
                  <Row
                    key={index}
                    item={item}
                    index={index}
                    arrStatus={arrStatus}
                    handleChangeStatus={handleChangeStatus}
                    handleClickDelete={handleClickDelete}
                    handleClickCancel={handleClickCancel}
                  />
                ))
              ) : (
                <tr>
                  <Empty />
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          {bills?.length ? (
            <Pagination
              current={current}
              onChange={(page) => setCurrent(page)}
              total={total}
              defaultPageSize={10}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

// export default ListOrder;
const mapStateToProps = (state) => {
  const { paymentsData, deleteData, updateData } = state.paymentReducer;
  return {
    paymentsData,
    deleteData,
    updateData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPayments: (params) => dispatch(getPayments(params)),
    deletePayments: (params) => dispatch(deletePayments(params)),
    updatePayments: (params) => dispatch(updatePayments(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOrder);
