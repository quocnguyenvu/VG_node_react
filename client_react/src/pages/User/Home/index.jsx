import { Col, Row, Tabs } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import ProductItem from '../../../components/ProductItem';
import { getCategory, getProductHome } from '../../../redux/actions';
import Slide from './Slide';
import './styles.scss';

const dataSlide = [
  {
    img: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: ['Fresh Fruits ', ' & vegetable'],
    thumbnail: 'Summer Vege sale',
  },
  {
    img: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1142&q=80',
    title: ['Prod Of Indian  ', '100% Pacaging'],
    thumbnail: 'Organic Indian Masala',
  },
  {
    img: 'https://cdn.shopify.com/s/files/1/0412/8151/9765/files/slider3-min.jpg?v=1593257113',
    title: ['Fresh for your', ' heath'],
    thumbnail: 'Top Selling!',
  },
];

const { TabPane } = Tabs;

function Home({ getProductHome, productHome, getCategory, categoryData }) {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = 'Vegana | Trang Chủ';

    getProductHome();
    getCategory();
  }, []);

  return (
    <div className="home fadeIn">
      <section className="home__slide">
        <Slide data={dataSlide} type="slideShow"></Slide>
      </section>
      <section className="home__banner">
        <div className="container">
          <Row gutter={24}>
            <Col md={12} sm={24}>
              <div className="banner__item">
                <a href="#" className="banner__img">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0412/8151/9765/files/banner1.jpg?v=1593258151"
                    alt="banner"
                  ></img>
                </a>
                <div className="banner__content ">
                  <h3 className="banner__title banner__title--white">
                    {t('home.banner.fresh fruit vegetable')} <br />
                    {t('home.banner.on our product')}
                  </h3>
                  <button className="button button-round button-primary">
                    {t('home.banner.shop now')}
                  </button>
                </div>
              </div>
            </Col>
            <Col md={12} sm={24}>
              <div className="banner__item">
                <a href="#" className="banner__img">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0412/8151/9765/files/banner2-min.jpg?v=1593256886"
                    alt="banner"
                  ></img>
                </a>
                <div className="banner__content ">
                  <h3 className="banner__title ">
                    {t('home.banner.Vegetable Eggplant')} <br />
                    {t('home.banner.100% Fresh food')}
                  </h3>
                  <button className="button button-round button-primary">
                    {t('home.banner.shop now')}
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <section className="home__category">
        <div className="container  category__container">
          <h2 className="category__title">{t('home.category.title')}</h2>
          <div className="category__slide">
            <Slide data={categoryData} type="category" xl={6} lg={5} md={4} sm={3} xs={2}></Slide>
          </div>
        </div>
      </section>
      <section className="home__countdown">
        <div
          className="countdown__container"
          style={{
            backgroundImage:
              "url('https://cdn.shopify.com/s/files/1/0412/8151/9765/files/dealbanner-min.jpg?v=1593257102')",
          }}
        >
          <div className="countdown__content">
            <p className="countdown__title--sub">{t('home.countdown.thumbnail')}</p>
            <h2 className="countdown__title--main">{t('home.countdown.title')}</h2>
            <div className="countdown__deal">
              <ul className="countdown__deal--list">
                <li className="countdown__deal--item">
                  <span className="countdown__deal--number">104</span>
                  <span className="countdown__deal--text">{t('home.countdown.day')}</span>
                </li>
                <li className="countdown__deal--item">
                  <span className="countdown__deal--number">6</span>
                  <span className="countdown__deal--text">{t('home.countdown.hrs')}</span>
                </li>
                <li className="countdown__deal--item">
                  <span className="countdown__deal--number">8</span>
                  <span className="countdown__deal--text">{t('home.countdown.min')}</span>
                </li>
                <li className="countdown__deal--item">
                  <span className="countdown__deal--number">12</span>
                  <span className="countdown__deal--text">{t('home.countdown.sec')}</span>
                </li>
              </ul>
            </div>
            <button className="button button-round--lg button-primary ">
              {t('home.countdown.shop collection')}
            </button>
          </div>
        </div>
      </section>
      <section className="home__product">
        <div className="container product__container">
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <button className="button button-round button-transparent">
                  {t('home.product.Special Product')}
                </button>
              }
              key="1"
            >
              <div className="products_home">
                {productHome?.special?.map((product, index) => (
                  <ProductItem data={product} key={index} />
                ))}
              </div>
            </TabPane>
            <TabPane
              tab={
                <button className="button button-round button-transparent">
                  {t('home.product.New Product')}
                </button>
              }
              key="2"
            >
              <div className="products_home">
                {productHome?.new?.map((product, index) => (
                  <ProductItem data={product} key={index} />
                ))}
              </div>
            </TabPane>
            <TabPane
              tab={
                <button className="button button-round button-transparent">
                  {t('home.product.Bestseller')}
                </button>
              }
              key="3"
            >
              <div className="products_home">
                {productHome?.sale?.map((product, index) => (
                  <ProductItem data={product} key={index} />
                ))}
              </div>
            </TabPane>
          </Tabs>
        </div>
      </section>
      <section className="home__shopify ">
        <div
          className="  shopify__wrapper"
          style={{
            backgroundImage:
              "url('https://cdn.shopify.com/s/files/1/0412/8151/9765/files/banner3-min.jpg?v=1593256888')",
          }}
        >
          <div className=" shopify__container wrapper">
            <div className="  shopify__content">
              <div className="shopify__title">
                <h2 className="shopify__title--main">{t('home.shopify.title')}</h2>
                <p className="shopify__title--sub">{t('home.shopify.sub')}</p>
              </div>
              <form className="shopify__form">
                <div className="shopify__form--container">
                  <input
                    placeholder={`${t('home.shopify.placeholder')}...`}
                    className="shopify__input"
                  />
                  <button type="button" className="shopify__btn--lg button">
                    {t('home.shopify.subscribe')}
                  </button>
                </div>

                <button
                  type="button"
                  className="shopify__btn--md button button-round--lg button-primary"
                >
                  {t('home.shopify.subscribe')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { productHome } = state.productReducer;
  const { categoryData } = state.categoryReducer;

  return {
    productHome,
    categoryData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProductHome: (params) => dispatch(getProductHome(params)),
    getCategory: (params) => dispatch(getCategory(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
