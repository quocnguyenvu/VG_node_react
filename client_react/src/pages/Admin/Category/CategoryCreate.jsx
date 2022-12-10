import { Col, Row } from 'antd';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaStarOfLife } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import * as Yup from 'yup';
import CustomField from '../../../components/Admin/CustomField/index';
import { categoryCreate, updateCategory, getCategoryDetail } from '../../../redux/actions';
import history from '../../../util/history';

const CategoryCreate = ({
  categoryCreate,
  getCategoryDetail,
  categoryDetail,
  match,
  updateCategory,
}) => {
  const { t } = useTranslation();
  const categoryId = match.params.id;
  const categoryDetailEdit = categoryDetail?.data?.category;

  const location = useLocation();
  const [file, setFile] = useState();
  console.log(file);

  useEffect(() => {
    document.title = 'Vegana | Thêm danh mục sản phẩm';
    if (location.pathname.indexOf(`edit`) !== -1) {
      getCategoryDetail(categoryId);
    }
  }, [categoryId, getCategoryDetail, location.pathname]);

  const handleCreateCategory = (values) => {
    categoryCreate({ ...values, img: file });
  };

  const handleEditCategory = (values) => {
    updateCategory({ id: categoryId, img: file, ...values });
  };

  return (
    <section className="addProductAdmin">
      <Row justify="center">
        <Col xs={18}>
          <div className="addProductAdmin__container container">
            <h1 className="addProductAdmin__title">{t('admin.create_category')}</h1>
            <Formik
              initialValues={{
                categoryId: location.pathname.indexOf(`edit`) !== -1 ? categoryDetailEdit?.id : '',
                name: location.pathname.indexOf(`edit`) !== -1 ? categoryDetailEdit?.name : '',
                description:
                  location.pathname.indexOf(`edit`) !== -1 ? categoryDetailEdit?.description : '',
              }}
              validationSchema={Yup.object({
                name: Yup.string()
                  .max(50, t('validate.discount.max'))
                  .required(t('validate.discount.required')),
              })}
              onSubmit={(values) => {
                if (location.pathname !== `/admin/category/edit/${categoryId}`) {
                  handleCreateCategory(values);
                } else handleEditCategory(values);
              }}
              enableReinitialize
            >
              <Form>
                <Row gutter={[24, 16]}>
                  <Col xs={24}>
                    <CustomField
                      name="name"
                      type="text"
                      label={t('admin.category_name')}
                      placeholder={t('admin.category_name_placeholder')}
                      required
                    />
                  </Col>
                  <Col xs={24}>
                    <CustomField
                      name="description"
                      type="text"
                      label={t('admin.description')}
                      placeholder={t('admin.category_description_placeholder')}
                      required
                    />
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
                          <Col span={24}>
                            <Field
                              name="img"
                              id="img"
                              type="select"
                              render={(FieldProps) => (
                                <input
                                  {...FieldProps.field}
                                  type="file"
                                  id="category"
                                  onChange={(evt) => setFile(evt.target.files)}
                                />
                              )}
                            />
                          </Col>
                          <Col span={24}>
                            {location.pathname.indexOf(`edit`) !== -1 && (
                              <img
                                style={{ maxWidth: '300px' }}
                                src={categoryDetailEdit?.img}
                                alt="Category images"
                              />
                            )}
                          </Col>
                        </Row>

                        <div className="text-danger">
                          <ErrorMessage name="image" />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24} className="admin__wrapper--button">
                    <Row justify="end" align="middle">
                      <button
                        type="button"
                        className="button button-round--lg button-primary button-back"
                        onClick={() => history.push('/admin/category')}
                      >
                        {t('admin.Back')}
                      </button>
                    </Row>
                    <Row justify="end" align="middle">
                      <button type="submit" className="button button-round--lg button-primary">
                        {location.pathname.indexOf(`/admin/category/edit`) === -1
                          ? t('admin.add')
                          : t('admin.update')}
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

const mapStateToProps = (state) => {
  const { categoryDetail } = state.categoryDetailReducer;

  return { categoryDetail };
};

const mapDispatchToProps = (dispatch) => {
  return {
    categoryCreate: (params) => dispatch(categoryCreate(params)),
    getCategoryDetail: (params) => dispatch(getCategoryDetail(params)),
    updateCategory: (params) => dispatch(updateCategory(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryCreate);
