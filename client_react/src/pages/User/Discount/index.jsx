import React, { useState, useEffect, useRef } from 'react';
import './styles.scss';
import { BiSearch } from 'react-icons/bi';
import Breadcrumb from '../../../components/Breadcrumb';
import { connect } from 'react-redux';
import { getDiscountUser, getAllDiscountUser, addDiscountUser } from '../../../redux/actions';
import DiscountItem from './../../../components/DiscountItem/index';
import { Col, Empty, Pagination, Row } from 'antd';

function Discount({
  getDiscountUser,
  discountUserData,
  totalDiscountAll,
  discountAllData,
  getAllDiscountUser,
}) {
  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState('');
  const [searchKey, setSearchKey] = useState();
  const [discountData, setDiscountData] = useState();

  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    document.title = 'Vegana | Danh sách mã giảm giá';
  }, []);

  useEffect(() => {
    if (localStorage.getItem('profile'))
      getDiscountUser({
        page: current,
        limit: 10,
        searchKey,
      });
    getAllDiscountUser({
      page: current,
      limit: 10,
      searchKey,
    });
  }, [current, searchKey]);

  useEffect(() => {
    handleActiveDiscountData();
  }, [discountUserData.length, discountAllData.length]);

  const handleActiveDiscountData = () => {
    if (!discountUserData.length && !discountAllData.length) return {};
    const data = discountAllData?.map((discount) => {
      if (discountUserData?.findIndex((dc) => dc.id === discount.id) > -1)
        return {
          ...discount,
          status: true,
        };
      return {
        ...discount,
        status: false,
      };
    });
    setDiscountData(data);
  };

  const handleChange = (e) => {
    const valueInput = e.target.value;
    setSearch(valueInput);

    clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setSearchKey(valueInput);
      setCurrent(1);
    }, 800);
  };

  return (
    <section>
      <div className="discount fadeIn">
        <Breadcrumb title="Discount" />
        <h1 className="discount__title">Mã giảm giá Vegana mới nhất</h1>
        <div className="discount__container">
          <h3>Tìm kiếm mã giảm giá</h3>
          <div className="discount__search">
            <input
              className="discount__search--input"
              value={search}
              type="text"
              placeholder="Nhập tên sản phẩm..."
              onChange={handleChange}
            />
            <span className="discount__search--icon">
              <BiSearch className="discount__icon" />
            </span>
          </div>
          <div className="discount__content">
            <h3>DANH SÁCH MÃ KHUYẾN MÃI Vegana</h3>
            <Row gutter={[16, 16]}>
              {discountUserData && discountAllData && discountData ? (
                discountData?.map((item) => (
                  <Col md={12} xs={24} className="discount__border" key={item.id}>
                    <DiscountItem data={item} />
                  </Col>
                ))
              ) : (
                <Empty />
              )}
            </Row>
          </div>
          <div className="pagination">
            {!totalDiscountAll ? (
              <Pagination
                current={current}
                onChange={(page) => setCurrent(page)}
                total={totalDiscountAll}
                defaultPageSize={10}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

// export default Discount;
const mapStateToProps = (state) => {
  const { discountUserData, totalDiscountAll, discountAllData } = state.discountReducer;
  return { discountUserData, totalDiscountAll, discountAllData };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDiscountUser: (params) => dispatch(getDiscountUser(params)),
    getAllDiscountUser: (params) => dispatch(getAllDiscountUser(params)),
    addDiscountUser: (params) => dispatch(addDiscountUser(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Discount);
