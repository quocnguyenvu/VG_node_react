import { Checkbox, Col, Row, Select } from 'antd';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import CustomField from './component/CustomField';
import PaymentBreadcrumb from './component/PaymentBreadcrumb';
import history from '../../../util/history';
import { AiFillHome } from 'react-icons/ai';
import './styles.scss';

const Information = ({ getInfo, infoUser, cartData, createBill }) => {
  document.title = 'Vegana | Thông tin';
  const { Option } = Select;
  const { t } = useTranslation();
  const [valueSelect, setValueSelect] = useState('vi');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [infoPayment, setInfoPayment] = useState(JSON.parse(localStorage.getItem('infoPayment')));

  const handleSubmitForm = (values) => {
    const { firstName, lastName } = values;
    const fullName = `${firstName} ${lastName}`;

    const dataForm = {
      ...values,
      country: valueSelect,
      phoneNumber: values.phone,
      name: fullName,
    };

    localStorage.setItem('infoPayment', JSON.stringify(dataForm));
    history.push('/shipping');
  };

  return (
    <div className="payment-page fadeIn">
      <div className="container payment__container">
        <section className="information">
          <div className="payment-page__title" onClick={() => history.push('/')}>
            <AiFillHome /> <h1 className="information__title">vegina-store</h1>
          </div>
          <PaymentBreadcrumb />
          <Formik
            initialValues={{
              email: (user || infoPayment).email,
              firstName: (user || infoPayment).firstName,
              lastName: (user || infoPayment).lastName,
              address: (user || infoPayment).address || '',
              zipCode: (user || infoPayment).zipCode || '',
              phone: (user || infoPayment).phoneNumber || '',
              check: true,
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                // .required(t('validate.email.required'))
                .max(50, t('validate.email.max'))
                .email('validate.email.regex'),
              firstName: Yup.string()
                .max(50, t('validate.firstName.max'))
                .required(t('validate.firstName.required')),
              lastName: Yup.string()
                .max(20, t('validate.lastName.max'))
                .required(t('validate.lastName.required')),
              phone: Yup.string()
                .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, t('validate.phone.regex'))
                .required(t('validate.phone.required')),
              address: Yup.string()
                .required(t('validate.address.required'))
                .max(100, t('validate.address.max')),
              zipCode: Yup.string().matches(/([0-9]{6})/, t('validate.zipCode')),
            })}
            onSubmit={(values) => handleSubmitForm(values)}
            enableReinitialize
          >
            <Form>
              <Row gutter={[24, 16]}>
                <Col xs={24}>
                  {/* <CustomField name="email" type="email" label="Email" /> */}
                  <CustomField name="phone" type="text" label={t('payments.information.Phone')} />
                </Col>
                <Col xs={24}>
                  <div className="form__control">
                    <Field
                      type="checkbox"
                      name="check"
                      render={({ field }) => (
                        <Checkbox {...field}>{t('payments.information.check')}</Checkbox>
                      )}
                    />
                  </div>
                </Col>

                <Col sm={12} xs={24}>
                  <CustomField
                    name="firstName"
                    type="text"
                    label={t('payments.information.First name')}
                  />
                </Col>

                <Col sm={12} xs={24}>
                  <CustomField
                    name="lastName"
                    type="text"
                    label={t('payments.information.Last name')}
                  />
                </Col>
                <Col sm={15} xs={24}>
                  <CustomField
                    name="address"
                    type="text"
                    label={t('payments.information.Address')}
                  />
                </Col>
                <Col sm={9} xs={24}>
                  {/* <CustomField name="phone" type="text" label={t('payments.information.Phone')} /> */}
                  <CustomField name="email" type="email" label="Email" />
                </Col>
                {/* <Col sm={9} xs={24}>
                  <div className="form__control">
                    <label htmlFor="title">{t('payments.information.Country/region')}</label>
                    <Field
                      name="country"
                      render={({ field }) => (
                        <Select
                          {...field}
                          defaultValue="vi"
                          style={{ width: '100%' }}
                          className="form__control--select"
                          onChange={(value) => setValueSelect(value)}
                        >
                          <Option value="vi">
                            <img src={VietNam} className="header__language--img" />
                            <span>Viet Nam</span>
                          </Option>
                          <Option value="en">
                            <img src={English} className="header__language--img" />
                            <span>England</span>
                          </Option>
                        </Select>
                      )}
                    />
                  </div>
                </Col>
                <Col sm={15} xs={24}>
                  <CustomField
                    name="zipCode"
                    type="text"
                    label={t('payments.information.ZIP code')}
                  />
                </Col> */}
                <Col>
                  <button type="submit" className="button button-round--lg button-primary">
                    {t('payments.information.Continue to shipping')}
                  </button>
                  <button
                    type="button"
                    className="button button-round--lg button-transparent"
                    onClick={() => history.push('/cart')}
                  >
                    {t('payments.information.Return to cart')}
                  </button>
                </Col>
              </Row>
            </Form>
          </Formik>
        </section>
      </div>
    </div>
  );
};

export default Information;
