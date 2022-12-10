import React, { useState, useEffect } from 'react';
import { Col, Collapse, Row, Button, Input, Form as FormAnt, Spin } from 'antd';
import { BsPencilSquare } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import { editProfile, getInfo, editUserPassword } from '../../../redux/actions';
import * as Yup from 'yup';
import { toastSuccess, toastComingSoon, toastError } from '../../../util/toast';
import './style.scss';
import history from '../../../util/history';
const { Panel } = Collapse;

function InfoManage(prop) {
  const { editProfile, infoUser, getInfo, editUserPassword, tabValue } = prop;
  const { t } = useTranslation();

  const [editable, setEditable] = useState(false);
  const [isShowChangePw, setIsShowChangePw] = useState(false);
  document.title = 'Vegana | Trang Thông tin cá nhân';

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    tabValue !== '1' && getInfo();
  }, [tabValue]);

  const handleSubmitInfo = async (value) => {
    delete value.phoneNumber;
    await editProfile({
      ...value,
    });

    getInfo();
    setEditable(!editable);
  };

  const handleSubmitPassword = async (values) => {
    infoUser?.data?.email
      ? await editUserPassword({
          password: values.passwordInner,
          newPassword: values.passwordNew,
        })
      : toastError('Bạn chưa có email !');

    getInfo();
    setIsShowChangePw(false);
  };

  const callback = () => {
    setIsShowChangePw(!isShowChangePw);
  };

  const arrProfile = [
    {
      id: 1,
      title: t('Full Name'),
      content: infoUser?.data?.fullName,
      type: 'name',
      last: 'last',
    },
    {
      id: 2,
      title: t('Email'),
      content: infoUser?.data?.email,
      type: 'email',
    },
    {
      id: 3,
      title: t('Profile.account.address'),
      content: `${infoUser?.data?.address ?? ''} `,
      type: 'address',
    },
    {
      id: 4,
      title: t('Profile.account.phone'),
      content: `${infoUser?.data?.phoneNumber ?? ''}`,
      type: 'phoneNumber',
    },
  ];

  return (
    <>
      {/* <div className="profile__modal"></div> */}
      {infoUser.load ? (
        <div className="loading">
          <Spin />
        </div>
      ) : (
        <section className="profile fadeIn">
          <div className="container">
            <h2>
              {t('Profile.welcome')} {infoUser?.data?.fullName}
            </h2>
            <div className="profile__content">
              <Row>
                <Col xs={24} md={12} sm={24} lg={12}>
                  <div className="profile__content--cart">
                    <p>{t('Categories.My_Account.name')}</p>
                    <ul>
                      <li>
                        <span
                          onClick={() => {
                            toastComingSoon();
                          }}
                        >
                          {t('Categories.My_Account.My Wishlist')}
                        </span>
                      </li>
                      <li>
                        <span onClick={() => history.push('/cart')}>
                          {t('Categories.My_Account.My Cart')}
                        </span>
                      </li>
                      <li>
                        <Collapse
                          activeKey={[`${isShowChangePw === true ? 1 : ''}`]}
                          ghost
                          accordion
                          bordered={false}
                          destroyInactivePanel={true}
                          onChange={callback}
                        >
                          <Panel
                            showArrow={false}
                            header={
                              <>
                                <span>
                                  {t('Profile.edit')}
                                  <span>
                                    <BsPencilSquare />
                                  </span>
                                </span>
                              </>
                            }
                            key="1"
                          >
                            <FormAnt
                              onFinish={handleSubmitPassword}
                              name="basic"
                              initialValues={{ remember: true }}
                            >
                              <div>{t('Profile.inner')}</div>

                              <FormAnt.Item
                                name="passwordInner"
                                rules={[
                                  {
                                    required: true,
                                    message: t('validate.password.required'),
                                  },
                                  {
                                    min: 8,
                                    message: t('validate.password.regex'),
                                  },
                                ]}
                                hasFeedback
                              >
                                <Input.Password />
                              </FormAnt.Item>
                              <div>{t('Profile.new')}</div>

                              <FormAnt.Item
                                name="passwordNew"
                                dependencies={['passwordInner']}
                                rules={[
                                  {
                                    required: true,
                                    message: t('validate.password.required'),
                                  },
                                  {
                                    min: 8,
                                    message: t('validate.password.regex'),
                                  },
                                  ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                      if (value && getFieldValue('passwordInner') === value) {
                                        return Promise.reject(t('Profile.confirm_pw'));
                                      }

                                      return Promise.resolve();
                                    },
                                  }),
                                ]}
                                hasFeedback
                              >
                                <Input.Password />
                              </FormAnt.Item>

                              <div>{t('Profile.confirm')}</div>

                              <FormAnt.Item
                                name="passwordConfirm"
                                dependencies={['passwordNew']}
                                hasFeedback
                                rules={[
                                  {
                                    required: true,
                                    message: t('validate.password.required'),
                                  },
                                  ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                      if (getFieldValue('passwordNew') === value) {
                                        return Promise.resolve();
                                      }

                                      return Promise.reject(t('Profile.confirm_pwNew'));
                                    },
                                  }),
                                ]}
                              >
                                <Input.Password />
                              </FormAnt.Item>
                              <FormAnt.Item>
                                <Button htmlType="submit" type="primary">
                                  <h6>{t('Profile.submit')}</h6>
                                </Button>
                              </FormAnt.Item>
                            </FormAnt>
                          </Panel>
                        </Collapse>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col xs={24} md={12} sm={24} lg={12}>
                  <div className="profile__content--info">
                    <p>{t('Profile.account.title')}</p>
                    <div className="profile__content--info-detail">
                      <Formik
                        initialValues={{
                          firstName: infoUser?.data?.firstName,
                          lastName: infoUser?.data?.lastName,
                          email: infoUser?.data?.email,
                          address: infoUser?.data?.address,
                          phoneNumber: infoUser?.data?.phoneNumber,
                        }}
                        enableReinitialize
                        validationSchema={Yup.object({
                          firstName: Yup.string()
                            .required(t('validate.first'))
                            .max(20, t('Profile.max')),
                          lastName: Yup.string()
                            .required(t('validate.last'))
                            .max(20, t('Profile.max')),
                          email: Yup.string()
                            .required(t("Email can't be blank !"))
                            .matches(
                              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                              'Invalid mail !'
                            ),
                        })}
                        onSubmit={(value) => handleSubmitInfo(value)}
                      >
                        <Form>
                          {arrProfile.map((item, index) => {
                            return (
                              <>
                                <div key={item.id} className="info__detail-inner">
                                  <p>{item.title}:</p>
                                  <div>
                                    {editable === false ? (
                                      <p className="fullName">{item.content}</p>
                                    ) : item.type === 'name' ? (
                                      <>
                                        <Collapse
                                          accordion
                                          bordered={false}
                                          destroyInactivePanel={true}
                                        >
                                          <Panel
                                            showArrow={false}
                                            ghost
                                            header={<BsPencilSquare />}
                                            key="2"
                                          >
                                            <div className="profile-input">
                                              <label htmlFor="firstName">
                                                {t('Profile.account.first')}
                                              </label>
                                              <Field id="firstName" type="text" name="firstName" />
                                              <span className="error-message">
                                                <ErrorMessage name="firstName" />
                                              </span>
                                            </div>
                                            <div>
                                              <label htmlFor="lastName">
                                                {t('Profile.account.last')}
                                              </label>
                                              <Field id="lastName" type="text" name="lastName" />
                                              <span className="error-message">
                                                <ErrorMessage name="lastName" />
                                              </span>
                                            </div>
                                          </Panel>
                                        </Collapse>
                                      </>
                                    ) : item.type === 'phoneNumber' ? (
                                      <p>{item.content}</p>
                                    ) : item.type === 'email' ? (
                                      <>
                                        <Field type="text" name={item.type} />
                                        <span className="error-message">
                                          <ErrorMessage name="email" />
                                        </span>
                                      </>
                                    ) : (
                                      <Field type="text" name={item.type} />
                                    )}
                                  </div>
                                </div>
                              </>
                            );
                          })}
                          <div className="btn-profile">
                            <Button
                              htmlType="reset"
                              onClick={() => {
                                setEditable(!editable);
                              }}
                              type="primary"
                            >
                              {editable === true
                                ? t('Profile.account.cancel')
                                : t('Profile.account.edit')}
                            </Button>
                            {editable === true && (
                              <Button htmlType="submit" type="primary">
                                {t('Profile.account.save')}
                              </Button>
                            )}
                          </div>
                        </Form>
                      </Formik>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
const mapStateToProps = (state) => {
  const { editProfile, infoUser } = state.accountReducer;

  return {
    editProfile,
    infoUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    editProfile: (params) => dispatch(editProfile(params)),
    getInfo: (params) => dispatch(getInfo(params)),
    editUserPassword: (params) => dispatch(editUserPassword(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoManage);
