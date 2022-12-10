import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Row, Col, DatePicker, Select } from 'antd';
import CustomField from '../../../../components/Admin/CustomField/index';
import { FaStarOfLife } from 'react-icons/fa';
import { connect } from 'react-redux';
import { createDiscount } from '../../../../redux/actions';
import history from '../../../../util/history';
import moment from 'moment';
import './style.scss';

const CreateDiscount = ({ createDiscount }) => {
  const { t } = useTranslation();
  const { Option } = Select;
  const dateFormat = 'DD/MM/YYYY';

  const [discountType, setDiscountType] = useState(true);

  useEffect(() => {
    document.title = 'Vegana | Thêm sản phẩm';
  }, []);

  const handelChangeDiscountType = (e) => {
    setDiscountType(e);
  };

  function disabledDate(current) {
    return current && current < moment().endOf('day');
  }

  const handleCreateDiscount = (values) => {
    const dateCreate = values.dateCreate._d;
    const dateExpire = values.dateExpire._d;

    delete values.discountType;
    if (discountType) {
      delete values.amount;
    } else delete values.sale;
    createDiscount({ ...values, dateCreate, dateExpire, codeName: values.codeName.toUpperCase() });
  };
  return (
    <section className="addProductAdmin">
      <Row justify="center">
        <Col xs={18}>
          <div className="addProductAdmin__container container">
            <h1 className="addProductAdmin__title">{t('admin.discount.CREATE DISCOUNT CODE')}</h1>
            <Formik
              initialValues={{
                title: '',
                codeName: '',
                sale: '',
                total: '',
                amount: '',
                dateCreate: null,
                dateExpire: null,
                description: '',
                discountType: true,
              }}
              validationSchema={Yup.object({
                title: Yup.string()
                  .max(50, t('validate.discount.max'))
                  .required(t('validate.discount.required')),
                codeName: Yup.string()
                  .matches(/^[A-Z]{3}[A-Z0-9]+$/, t('validate.discount.code name'))
                  .max(20, t('validate.discount.max 20'))
                  .required(t('validate.discount name.required')),
                dateCreate: Yup.date().nullable().required('validate.discount start date.required'),
                dateExpire: Yup.date().nullable().required('validate.discount end date.required'),
                total: Yup.string().required(t('validate.discount.required')),
                discountType: Yup.boolean(),
                amount: Yup.string().when('discountType', (discountType) => {
                  if (!discountType) {
                    return Yup.string()
                      .required(t('validate.discount.amount.required'))
                      .matches(/^[1-9]\d*$/, t('validate.amount.interger'))
                      .matches(/(^(1|2|3|4|5|6|7|8|9)+[0-9]{4,8}$)/, t('validate.amount.regex'));
                  }
                }),
                description: Yup.string().required(t('validate.discount.description.required')),
                sale: Yup.string().when('discountType', (discountType) => {
                  if (discountType) {
                    return Yup.string()
                      .required(t('validate.discount.required'))
                      .matches(/^[1-9][0-9]?$|^100$/, t('validate.discount.percent'));
                  }
                }),
              })}
              onSubmit={(values) => {
                handleCreateDiscount(values);
              }}
              enableReinitialize
            >
              <Form>
                <Row gutter={[24, 16]}>
                  <Col xs={24}>
                    <CustomField
                      name="title"
                      type="text"
                      label={t('admin.discount.Discount name')}
                      placeholder={t('admin.products.Enter discount name')}
                      required
                    />
                  </Col>
                  <Col xs={24}>
                    <CustomField
                      name="codeName"
                      type="text"
                      label={t('admin.products.Discount code')}
                      placeholder={t('admin.products.Enter discount code')}
                      required
                    />
                  </Col>
                  <Col xs={24}>
                    <Row align="middle">
                      <Col md={6}>
                        <label className htmlFor="categoryId">
                          {t('admin.discount.Discount type')}
                          <FaStarOfLife />
                        </label>
                      </Col>
                      <Col md={18}>
                        <Field
                          name="discountType"
                          id="discountType"
                          type="select"
                          render={(FieldProps) => (
                            <Select
                              {...FieldProps.field}
                              style={{ width: '100%' }}
                              className="form__control--select"
                              placeholder={t('admin.discount.Select type')}
                              defaultValue={true}
                              onChange={(value) => {
                                handelChangeDiscountType(value);
                                return FieldProps.form.setFieldValue(FieldProps.field.name, value);
                              }}
                            >
                              <Option value={true}>Giảm theo phần trăm</Option>
                              <Option value={false}>Giảm trực tiếp theo giá</Option>
                            </Select>
                          )}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24}>
                    <CustomField
                      name="sale"
                      type="text"
                      label={t('admin.products.Percent')}
                      placeholder={t('admin.products.Enter percent')}
                      disabled={!discountType}
                      required
                    />
                  </Col>
                  <Col xs={24}>
                    <CustomField
                      name="amount"
                      type="text"
                      label={t('admin.discount.Amount')}
                      placeholder={t('admin.products.Enter amount')}
                      disabled={discountType}
                      required
                    />
                  </Col>
                  <Col xs={24}>
                    <Row align="middle">
                      <Col md={6}>
                        <label className htmlFor="dateCreate">
                          {t('admin.discount.StartDate')}
                          <FaStarOfLife />
                        </label>
                      </Col>
                      <Col md={18}>
                        <Field
                          name="dateCreate"
                          id="dateCreate"
                          render={(FieldProps) => (
                            <DatePicker
                              {...FieldProps.field}
                              format={dateFormat}
                              disabledDate={disabledDate}
                              onChange={(value) =>
                                FieldProps.form.setFieldValue(FieldProps.field.name, value)
                              }
                            />
                          )}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24}>
                    <Row>
                      <Col md={6}>
                        <label className htmlFor="dateExpire">
                          {t('admin.discount.EndDate')}
                          <FaStarOfLife />
                        </label>
                      </Col>
                      <Col md={18}>
                        <Field
                          name="dateExpire"
                          id="dateExpire"
                          render={(FieldProps) => (
                            <DatePicker
                              {...FieldProps.field}
                              format={dateFormat}
                              disabledDate={disabledDate}
                              onChange={(value) =>
                                FieldProps.form.setFieldValue(FieldProps.field.name, value)
                              }
                            />
                          )}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24}>
                    <CustomField
                      name="total"
                      type="text"
                      label={t('admin.products.Quantity')}
                      placeholder={t('admin.products.Enter quantity')}
                      required
                    />
                  </Col>
                  <Col xs={24}>
                    <CustomField
                      name="description"
                      type="textarea"
                      label={t('admin.products.Description')}
                      placeholder={t('admin.products.Enter description')}
                      required
                    />
                  </Col>
                  <Col xs={24} className="admin__wrapper--button">
                    <Row justify="end" align="middle">
                      <button
                        type="button"
                        className="button button-round--lg button-primary button-back"
                        onClick={() => history.push('/admin/discount')}
                      >
                        {t('admin.Back')}
                      </button>
                    </Row>
                    <Row justify="end" align="middle">
                      <button type="submit" className="button button-round--lg button-primary">
                        {t('admin.discount.Add new')}
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

const mapDispatchToProps = (dispatch) => {
  return {
    createDiscount: (params) => dispatch(createDiscount(params)),
  };
};
export default connect(null, mapDispatchToProps)(CreateDiscount);
