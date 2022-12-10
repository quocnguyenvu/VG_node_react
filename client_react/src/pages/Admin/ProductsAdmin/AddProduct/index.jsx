import { Col, Row, Select } from 'antd';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaStarOfLife } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import CustomField from '../../../../components/Admin/CustomField/index';
import {
  createProduct,
  getProductDetail,
  getSidebar,
  updateProduct,
} from '../../../../redux/actions';
import history from '../../../../util/history';
import './styles.scss';

const AddProductAdmin = ({
  match,
  getSidebar,
  sidebarData,
  createProduct,
  getProductDetail,
  updateProduct,
  productDetail,
}) => {
  const productId = match.params.id;
  const { t } = useTranslation();
  const { Option } = Select;
  const location = useLocation();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    document.title = 'Vegana | Thêm sản phẩm';
    getSidebar();
    if (location.pathname.indexOf(`edit`) !== -1) {
      getProductDetail(productId);
    }
  }, [getProductDetail, getSidebar, location.pathname, productId]);

  const handleCreateProduct = (values) => {
    createProduct({ ...values, imgs: files, price: parseInt(values.price) });
  };

  const handleEditProduct = (values) => {
    const data = {
      id: productId,
      ...values,
      price: parseInt(values.price),
    };
    updateProduct({ ...data });
  };
  return (
    <section className="addProductAdmin">
      {/* <Row>
        <Col offset={2}>
          <AiOutlineRollback
            className="icon-back"
            onClick={() => history.push('/admin/products')}
          />
        </Col>
      </Row> */}
      <Row justify="center">
        <Col xs={18}>
          <div className="addProductAdmin__container container">
            <h1 className="addProductAdmin__title">{t('admin.products.More new products')}</h1>
            <Formik
              initialValues={{
                name:
                  location.pathname.indexOf(`edit`) !== -1
                    ? productDetail?.data?.product?.name
                    : '',
                categoryId:
                  location.pathname.indexOf(`edit`) !== -1
                    ? productDetail?.data?.product?.categoryId.id
                    : '',
                origin:
                  location.pathname.indexOf(`edit`) !== -1
                    ? productDetail?.data?.product?.origin
                    : '',
                des:
                  location.pathname.indexOf(`edit`) !== -1 ? productDetail?.data?.product?.des : '',
                shortDes:
                  location.pathname.indexOf(`edit`) !== -1
                    ? productDetail?.data?.product?.shortDes
                    : '',
                tagId:
                  location.pathname.indexOf(`edit`) !== -1
                    ? productDetail?.data?.product?.tagId.id
                    : '',
                price:
                  location.pathname.indexOf(`edit`) !== -1
                    ? productDetail?.data?.product?.price
                    : '',
                sale:
                  location.pathname.indexOf(`edit`) !== -1
                    ? productDetail?.data?.product?.sale
                    : '',
                unit:
                  location.pathname.indexOf(`edit`) !== -1
                    ? productDetail?.data?.product?.unit
                    : '',
                total:
                  location.pathname.indexOf(`edit`) !== -1
                    ? productDetail?.data?.product?.total
                    : '',
                // image: [],
              }}
              validationSchema={Yup.object({
                name: Yup.string()
                  .max(50, t('validate.name.max'))
                  .required(t('validate.name.required')),
                shortDes: Yup.string().required(t('validate.Short description.required')),
                // categoryId: Yup.string().required(t('validate.category.required')),
                total: Yup.string()
                  .matches(/^[1-9]\d*$/, t('validate.total.interger'))
                  .required(t('validate.total.required')),
                // tagId: Yup.string().required(t('validate.tag.required')),
                unit: Yup.string().required(t('validate.tag.required')),
                price: Yup.string()
                  .required(t('validate.price.required'))
                  .matches(/^[1-9]\d*$/, t('validate.price.interger'))
                  .matches(/(^(1|2|3|4|5|6|7|8|9)+[0-9]{4,8}$)/, t('validate.price.regex')),
                ...(location.pathname.indexOf(`edit`) !== -1 && {
                  sale: Yup.string()
                    .required(t('validate.size.required'))
                    .matches(/([0-9]{1,2})/, t('validate.size.regex')),
                }),
                // imgs: Yup.array.min(4, t('validate.image.required')),
              })}
              onSubmit={(values) => {
                if (location.pathname !== `/admin/products/edit/${productId}`)
                  handleCreateProduct(values);
                else handleEditProduct(values);
              }}
              enableReinitialize
            >
              <Form>
                <Row gutter={[24, 16]}>
                  <Col xs={24}>
                    <CustomField
                      name="name"
                      type="text"
                      label={t("admin.products.Product's name")}
                      placeholder={t('admin.products.Enter product name')}
                      required
                    />
                  </Col>
                  <Col xs={24}>
                    <CustomField
                      name="price"
                      type="text"
                      label={t('admin.products.Price')}
                      placeholder={t('admin.products.Enter price')}
                      required
                    />
                  </Col>
                  {location.pathname.indexOf(`edit`) !== -1 && (
                    <Col xs={24}>
                      <CustomField
                        name="sale"
                        type="text"
                        label={t('admin.products.Sale')}
                        placeholder={t('admin.products.Enter sale')}
                        required
                      />
                    </Col>
                  )}
                  <Col xs={24}>
                    <Row align="middle">
                      <Col md={6}>
                        <label className htmlFor="categoryId">
                          {t('admin.products.Category')}
                          <FaStarOfLife />
                        </label>
                      </Col>
                      <Col md={18}>
                        <Field
                          name="categoryId"
                          id="categoryId"
                          render={(FieldProps) => (
                            <Select
                              {...FieldProps.field}
                              style={{ width: '100%' }}
                              className="form__control--select"
                              placeholder={t('admin.products.Select category')}
                              onChange={(value) =>
                                FieldProps.form.setFieldValue(FieldProps.field.name, value)
                              }
                            >
                              {sidebarData?.categoryData?.map((item) => (
                                <Option key={item.id} value={item.id}>
                                  {item.name}
                                </Option>
                              ))}
                            </Select>
                          )}
                        />
                        <div className="text-danger">
                          <ErrorMessage name="categoryId" />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24}>
                    <Row align="middle">
                      <Col md={6}>
                        <label htmlFor="tagId">
                          {t('admin.products.Tag')}
                          <FaStarOfLife />
                        </label>
                      </Col>
                      <Col md={18}>
                        <Field
                          name="tagId"
                          id="tagId"
                          type="select"
                          render={(FieldProps) => (
                            <Select
                              {...FieldProps.field}
                              style={{ width: '100%' }}
                              className="form__control--select"
                              placeholder={t('admin.products.Select tag')}
                              onChange={(value) =>
                                FieldProps.form.setFieldValue(FieldProps.field.name, value)
                              }
                            >
                              {sidebarData?.tagsData?.map((item, i) => (
                                <Option value={item.id} key={i}>
                                  {item.name}
                                </Option>
                              ))}
                            </Select>
                          )}
                        />
                        <div className="text-danger">
                          <ErrorMessage name="tagId" />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24}>
                    <Row align="middle">
                      <Col md={6}>
                        <label htmlFor="tagId">
                          {t('admin.products.Unit')}
                          <FaStarOfLife />
                        </label>
                      </Col>
                      <Col md={18}>
                        <Field
                          name="unit"
                          id="unit"
                          type="select"
                          render={(FieldProps) => (
                            <Select
                              {...FieldProps.field}
                              style={{ width: '100%' }}
                              className="form__control--select"
                              placeholder={t('admin.products.Select unit')}
                              onChange={(value) =>
                                FieldProps.form.setFieldValue(FieldProps.field.name, value)
                              }
                            >
                              {unitData.map((item, i) => (
                                <Option value={item} key={i}>
                                  {item}
                                </Option>
                              ))}
                            </Select>
                          )}
                        />
                        <div className="text-danger">
                          <ErrorMessage name="unit" />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24}>
                    <Row align="middle">
                      <Col md={6}>
                        <label htmlFor="image">
                          {t('admin.products.Image')}
                          <FaStarOfLife />
                        </label>
                      </Col>
                      <Col md={18}>
                        <Row align="middle" gutter={[0, 8]}>
                          <Col>
                            <Field
                              name="imgs"
                              id="imgs"
                              type="select"
                              render={(FieldProps) => (
                                <input
                                  {...FieldProps.field}
                                  type="file"
                                  id="avatar"
                                  onChange={(evt) =>
                                    setFiles((files) => [...files, evt.target.files[0]])
                                  }
                                />
                              )}
                            />
                          </Col>
                          <Col>
                            {location.pathname.indexOf(`edit`) !== -1 && (
                              <div>
                                <Row gutter={[16, 24]}>
                                  {productDetail?.data?.product?.imgs?.map((item, index) => (
                                    <Col md={3} xs={5} key={index}>
                                      <img src={item} alt="anh product"></img>
                                    </Col>
                                  ))}
                                </Row>
                              </div>
                            )}
                          </Col>
                        </Row>

                        <div className="text-danger">
                          <ErrorMessage name="image" />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24}>
                    <CustomField
                      name="total"
                      required
                      type="text"
                      label={t('admin.products.Total product')}
                      placeholder={t('admin.products.Enter total product')}
                    ></CustomField>
                  </Col>
                  <Col xs={24}>
                    <CustomField
                      name="shortDes"
                      required
                      type="text"
                      label={t('admin.products.Short description')}
                      placeholder={t('admin.products.Enter short description')}
                    />
                  </Col>
                  <Col xs={24}>
                    <CustomField
                      name="des"
                      type="textarea"
                      label={t('admin.products.Describe')}
                      placeholder={t('admin.products.Enter describe')}
                    />
                  </Col>
                  <Col xs={24} className="admin__wrapper--button">
                    <Row justify="end" align="middle">
                      <button
                        type="button"
                        className="button button-round--lg button-primary button-back"
                        onClick={() => history.push('/admin/products')}
                      >
                        {t('admin.Back')}
                      </button>
                    </Row>
                    <Row justify="end" align="middle">
                      <button type="submit" className="button button-round--lg button-primary">
                        {location.pathname.indexOf(`/admin/products/edit`) === -1
                          ? t('admin.products.Add new')
                          : t('admin.products.Edit')}
                      </button>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </Formik>
          </div>
        </Col>
      </Row>
    </section>
  );
};

const unitData = ['Kg', 'Cái', 'Quả'];

const mapStateToProps = (state) => {
  const { sidebarData } = state.categoryReducer;
  const { productDetail } = state.productDetailReducer;

  return { sidebarData, productDetail };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSidebar: (params) => dispatch(getSidebar(params)),
    createProduct: (params) => dispatch(createProduct(params)),
    updateProduct: (params) => dispatch(updateProduct(params)),
    getProductDetail: (params) => dispatch(getProductDetail(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProductAdmin);
