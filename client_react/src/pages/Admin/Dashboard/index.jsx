import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import LineChart from './LineChart';
import { Input, Pagination, Spin, Row, Col, message } from 'antd';
import { getMasterData } from '../../../redux/actions';
import './style.scss';

const Dashboard = ({ getMasterData, masterData, loading }) => {
  const [cartDat, setCartData] = useState();
  const [dataCard, setDataCard] = useState();

  useEffect(() => {
    getMasterData();
  }, []);

  useEffect(() => {
    if (masterData) handleDataCard();
  }, [masterData]);

  const handleDataCard = () => {
    if (!masterData) {
      setDataCard([]);
    } else {
      const bills = masterData?.bills?.reduce((sum, bill) => sum + bill.bills, 0);
      const users = masterData?.users?.reduce((sum, bill) => sum + bill.users, 0);
      const products = masterData?.products?.reduce((sum, bill) => sum + bill.products, 0);

      setDataCard([
        { id: 1, title: 'Sản phẩm', count: products || 0 },
        { id: 2, title: 'Người dùng', count: users || 0 },
        { id: 3, title: 'Doanh thu', count: bills || 0 },
      ]);
    }
  };

  const handleChangeData = () => {};

  return (
    <section className="dashboard">
      <div className="container">
        <div className="dashboard__card">
          <Card data={dataCard}></Card>
        </div>
        <LineChart data={masterData} loading={loading} setCartData={setCartData} />
      </div>
    </section>
  );
};

const cardData = [
  { id: 1, title: 'Sản phẩm', count: '123' },
  { id: 2, title: 'Người dùng', count: '12' },
  { id: 3, title: 'Doanh thu', count: '123100' },
];

const mapStateToProps = (state) => {
  const { masterData, loading } = state.dashboardReducer;
  return { masterData, loading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMasterData: (params) => dispatch(getMasterData(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
