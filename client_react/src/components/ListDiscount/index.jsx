import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { getVoucherUser } from '../../redux/actions';
import { Input, Pagination, Spin, Row, Col, message } from 'antd';
import DiscountItem from './../../components/DiscountItem/index';

import './style.scss';
function ListDiscount(prop) {
  const { getVoucherUser, tabValue, listVoucherUser } = prop;
  const [current, setCurrent] = useState(1);
  const [searchKey, setSearchKey] = useState('');
  const { Search } = Input;
  const { t } = useTranslation();
  document.title = 'Vegana | Trang Thông tin cá nhân';

  useEffect(() => {
    tabValue !== '3' &&
      getVoucherUser({
        search: searchKey,
        page: current,
        limit: 10,
      });
  }, [current, searchKey, tabValue]);

  function onSearch(value) {
    setSearchKey(value);
    setCurrent(1);
  }

  return (
    <>
      {listVoucherUser?.load ? (
        <div className="loading">
          <Spin />
        </div>
      ) : (
        <section className="voucher fadeIn">
          <div className="container">
            <p className="voucher-title">{t('Danh sách mã giảm giá của bạn')}</p>
            <div className="voucher-container">
              <div className="voucher-search">
                <div>
                  <Search placeholder="input search text" onSearch={onSearch} enterButton />
                </div>
              </div>
              <div className="voucher-list">
                <div></div>
                <Row gutter={[16, 16]}>
                  {listVoucherUser?.data?.length !== 0 ? (
                    listVoucherUser?.data?.map((item, index) => (
                      <Col sm={24} md={24} lg={12} key={index}>
                        <DiscountItem data={item} />
                      </Col>
                    ))
                  ) : (
                    <p className="voucher-empty"> Bạn chưa có mã giảm giá nào ! </p>
                  )}
                </Row>
              </div>
              {listVoucherUser?.data?.length !== 0 && (
                <div className="pagination">
                  <Pagination
                    current={current}
                    onChange={(page) => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth',
                      });
                      setCurrent(page);
                    }}
                    total={listVoucherUser?.total}
                    defaultPageSize={10}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  const { listVoucherUser } = state.accountReducer;

  return {
    listVoucherUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVoucherUser: (params) => dispatch(getVoucherUser(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListDiscount);
