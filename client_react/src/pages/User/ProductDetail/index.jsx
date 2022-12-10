import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProductDetail, createComment, getComment, addCart } from '../../../redux/actions';
import { AiFillHeart } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { toastComingSoon, toastWarning } from '../../../util/toast';

import { GiShoppingBag } from 'react-icons/gi';
import Slide from '../Home/Slide';
import { FaTruckMoving, FaMoneyBillWave } from 'react-icons/fa';
import {
  Row,
  Col,
  Tabs,
  Input,
  Button,
  Comment,
  Tooltip,
  List,
  Collapse,
  Rate,
  Form,
  Radio,
  Pagination,
  Spin,
  Modal,
} from 'antd';

import './style.scss';
import moment from 'moment';
import history from '../../../util/history';

const ProductDetail = ({
  createComment,
  match,
  getProductDetail,
  productDetail,
  comments,
  addCart,
  getComment,
  listComment,
}) => {
  const product = productDetail.data?.product;
  const sales =
    product?.sale > 0 && Math.ceil(product?.price - product?.price * (product?.sale / 100));

  const productId = match.params.id;
  const [rateValue, setRateValue] = useState();
  const [valueQuantity, setValueQuantity] = useState(1);
  const [isShowFormComment, setIsShowFormComment] = useState(false);
  const [current, setCurrent] = useState(1);
  const [authData, setAuthData] = useState();
  const { t } = useTranslation();
  const { TabPane } = Tabs;
  document.title = 'Vegana | Trang Chi tiết';
  const { confirm } = Modal;

  useEffect(() => {
    setAuthData(() => JSON.parse(localStorage.getItem('profile')));
  }, []);

  useEffect(() => {
    getProductDetail(productId);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [productId]);

  useEffect(() => {
    getComment({
      productId,
      page: current,
      limit: 5,
    });
  }, [listComment, current, productId]);

  const { Panel } = Collapse;

  function callback(key) {
    setIsShowFormComment(!isShowFormComment);
  }

  function handleChangRate(value) {
    setRateValue(value);
  }

  const service = [
    {
      id: 1,
      icon: <FaTruckMoving />,
      name: t('DELIVERY INFO'),
      content: t('prodcutDetail.DELIVERY TEXT'),
    },
    {
      id: 2,
      icon: <FaMoneyBillWave />,
      name: t('30 DAYS RETURNS'),
      content: t('productDetail.30 DAYS RETURNS TEXT'),
    },
    {
      id: 3,
      icon: <GiShoppingBag />,
      name: t('10 YEAR WARRANTY'),
      content: t('prodcutDetail.10 YEAR WARRANTY TEXT'),
    },
  ];

  const handleSubmitForm = (value) => {};

  const handleSubmitFormComment = async (value) => {
    if (window.localStorage.getItem('token')) {
      await createComment({
        ...value,
        productId,
        rate: rateValue,
        dateCreate: moment(),
      });
      // getComment({productId,limit:5,page:1})
      setIsShowFormComment(false);
    } else {
      toastWarning(t('action.warning'));
      setIsShowFormComment(false);
    }
  };

  const modalInc = () => {
    confirm({
      title: `${t('cart.You can only order up to 30 products')}`,
      content: <></>,
      okText: `${t('cart.Yes')}`,
      onOk() {
        setValueQuantity(30);
      },
    });
  };

  const modalDec = () => {
    confirm({
      title: `${t('cart.You can only order a minimum of 1 product')}`,
      content: <></>,
      okText: `${t('cart.Yes')}`,
      onOk() {
        setValueQuantity(1);
      },
    });
  };

  const onChangeInput = (e) => {
    let value = parseInt(e);
    if (isNaN(value)) {
      value = '';
    } else if (value > 30) {
      modalInc();
    } else if (value <= 0) {
      modalDec();
    }
    setValueQuantity(value);
  };

  const handleAddToCart = () => {
    if (!authData) {
      toastWarning(t('action.warning'));
    } else {
      addCart({ productId: product.id, quantity: valueQuantity });
    }
  };

  const renderProductDetail = () => {
    return (
      <>
        <Row gutter={[30, 16]} className="fadeIn">
          <Col md={12} sm={24} lg={12}>
            <div className="productDetail__tabs--img">
              <div className="productDetail__tabs--img">
                <Tabs tabPosition="bottom" defaultActiveKey="1">
                  {product?.imgs?.map((item, index) => (
                    <TabPane
                      tab={
                        <div className="productDetail__tabs--img-bot">
                          <img src={item} alt="" />
                        </div>
                      }
                      key={index}
                    >
                      <div className={`productDetail__tabs--img-top`}>
                        <img src={item} alt="" />
                      </div>
                    </TabPane>
                  ))}
                </Tabs>
              </div>
            </div>
          </Col>

          <Col md={12} sm={24} lg={12}>
            <div className="productDetail__content">
              <div className="productDetail__content--title">
                <p>{product?.name}</p>
              </div>
              <div className="productDetail__content--info">
                <Rate disabled defaultValue={product?.rate} />
                <p className="spanColor">
                  {t('productDetail.Availability')}:{' '}
                  <span> {t('productDetail.Availability__stock')}</span>
                </p>
                <p className="spanColor">
                  <span>{`${(sales || product?.price)?.toLocaleString()} VND`} </span>
                  <span className="product-item__price--old">
                    {!!product?.sale && `${product?.sale} %`}
                  </span>
                </p>
                <p className="gray-color">
                  {t('Category')}: {product?.categoryId.name}
                </p>
                <p className="gray-color">{product?.shortDes || description}</p>
              </div>
              <Form name="validate_other" onFinish={handleSubmitForm}>
                <Form.Item label={<p>{t('productDetail.Quantity')}</p>}>
                  <Input
                    className="productDetail__quantity"
                    type="number"
                    value={valueQuantity}
                    onChange={(e) => onChangeInput(e.target.value)}
                  />
                </Form.Item>
                <div className="productDetail__btn">
                  <div className="productDetail__btn--item">
                    <Tooltip onClick={toastComingSoon} title="WISHLIST" color="black" key="white">
                      <AiFillHeart />
                    </Tooltip>
                  </div>
                  <div className="productDetail__btn--item" onClick={() => handleAddToCart()}>
                    <Tooltip title="ADD TO CART" color="black" key="white">
                      <GiShoppingBag />
                    </Tooltip>
                  </div>
                </div>
              </Form>
              <div className="productDetail__social">
                <p>{t('productDetail.Share')}:</p>
                <div>
                  <img
                    src="data:image/png;base64,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"
                    alt=""
                  />
                  <img
                    src="data:image/png;base64,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"
                    alt=""
                  />
                  <img
                    src="data:image/png;base64,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"
                    alt=""
                  />
                  <img
                    src="data:image/png;base64,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"
                    alt=""
                  />
                </div>
              </div>
              <div className="productDetail__partner">
                <img
                  src="https://cdn.shopify.com/s/files/1/0412/8151/9765/files/chekout.jpg?v=1593154965"
                  alt=""
                />
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  };
  return (
    <>
      <section className="productDetail">
        {productDetail.load ? (
          <div className="loading">
            <Spin />
          </div>
        ) : (
          <div className="container">
            <Row gutter={[30, 0]}>
              <Col md={24} lg={18}>
                {renderProductDetail()}
              </Col>
              <Col md={24} lg={6}>
                <ul className="productDetail__service">
                  {service.map((item, index) => (
                    <li key={item.id} className="productDetail__service--item">
                      <div className="productDetail__service--item-inner">
                        <span>{item.icon}</span>
                        <p className="title">{item.name}</p>
                        <p>{item.content}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
          </div>
        )}
        <div className="productDetail__review">
          <Tabs className="productDetail__description--tabs" defaultActiveKey="1">
            <TabPane tab={t('productDetail.DESCRIPTION')} key="1">
              <div className="container">{product?.des || description}</div>
            </TabPane>
            <TabPane tab={t('productDetail.REVIEW')} key="2">
              <div className="productDetail__description">
                <div className="container">
                  <div className="review__content">
                    <p>{t('productDetail.Review__customer')}</p>
                    <Collapse
                      activeKey={`${isShowFormComment === true ? 1 : ''}`}
                      destroyInactivePanel
                      ghost
                      bordered={false}
                      onChange={callback}
                    >
                      <Panel
                        showArrow={false}
                        header={<p className="write__content">{t('productDetail.Review')}</p>}
                        key="1"
                      >
                        <div className="review__content--form">
                          <Form onFinish={handleSubmitFormComment}>
                            <p>{t('productDetail.Review__rating')}</p>
                            <Rate
                              defaultValue={5}
                              allowClear={false}
                              onChange={(value) => handleChangRate(value)}
                            />
                            <p>{t('productDetail.Review__title')}</p>
                            <Form.Item
                              name="title"
                              rules={[
                                {
                                  required: true,
                                  message: t('productDetail.Review__validate.title'),
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                            <p>{t('productDetail.Review__body')}</p>
                            <Form.Item
                              name="description"
                              rules={[
                                {
                                  max: 255,
                                  message: t('productDetail.Review__validate.content'),
                                },
                              ]}
                            >
                              <Input.TextArea />
                            </Form.Item>
                            <Form.Item>
                              <Button type="primary" htmlType="submit">
                                {t('productDetail.Review__submit')}
                              </Button>
                            </Form.Item>
                          </Form>
                        </div>
                      </Panel>
                    </Collapse>
                    <List
                      className="comment-list"
                      header={`${comments.total || 0} ${t('prodcutDetail.replies')}`}
                      itemLayout="horizontal"
                      dataSource={comments?.data}
                      renderItem={(item) => (
                        <li>
                          <Comment
                            author={item.userId?.fullName}
                            avatar={
                              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                            }
                            content={
                              <>
                                <div>
                                  <Rate disabled value={item.rate} />
                                </div>
                                <div>
                                  <p>{item.title}</p>
                                  <span>{item.description}</span>
                                </div>
                              </>
                            }
                            datetime={
                              <Tooltip title={moment(item.dateCreate).format('DD-MM-YYYY, h:mm')}>
                                <span>{moment(item.dateCreate).format('DD-MM-YYYY, h:mm')}</span>
                              </Tooltip>
                            }
                            rate={item.rate}
                          />
                        </li>
                      )}
                    />
                  </div>
                  {comments.data?.length > 0 && (
                    <Pagination
                      total={comments.total}
                      defaultCurrent={1}
                      current={current}
                      defaultPageSize={5}
                      onChange={(page) => {
                        setCurrent(page);
                        window.scrollTo({
                          top: 0,
                          left: 0,
                          behavior: 'smooth',
                        });
                      }}
                    />
                  )}
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
        <div className="productDetail__related">
          <div className="container">
            <p>{t('Related Product')}</p>
            <div className="productDetail__related--item">
              <Slide
                data={productDetail.data?.relatedProduct}
                type="product"
                xl={4}
                lg={4}
                md={3}
                sm={2}
                xs={2}
              ></Slide>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const description =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.";

const mapStateToProps = (state) => {
  const { productDetail, comments, listComment } = state.productDetailReducer;
  return {
    productDetail,
    comments,
    listComment,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProductDetail: (params) => dispatch(getProductDetail(params)),
    createComment: (params) => dispatch(createComment(params)),
    getComment: (params) => dispatch(getComment(params)),
    addCart: (params) => dispatch(addCart(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
