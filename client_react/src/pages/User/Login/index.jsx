import React, { useEffect } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import history from '../../../util/history';
import { useTranslation } from 'react-i18next';

import './style.scss';
import { connect } from 'react-redux';
import { getUser } from '../../../redux/actions';

import './style.scss';
const Login = ({ getUser }) => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = 'Vegana | Trang Đăng nhập';
  });
  const [form] = Form.useForm();
  const handleSubmitForm = (values) => {
    getUser(values);
  };
  return (
    <>
      <section className="register fadeIn">
        <div className="container">
          <Row justify="center">
            <Col md={10} sm={12} xs={24} lg={7}>
              <Form
                form={form}
                name="register"
                className="form-register"
                onFinish={(values) => handleSubmitForm(values)}
                scrollToFirstError
              >
                <div className="register__title">
                  <h2>{t('login.create')}</h2>
                  <p>{t('login.text')}</p>
                </div>
                <div className="login__label">
                  {t('Phone Number')} <span className="required">*</span>
                </div>
                <Form.Item
                  name="phoneNumber"
                  rules={[
                    {
                      pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                      message: t('validate.phone.regex'),
                    },
                    {
                      required: true,
                      message: t('validate.phone.required'),
                    },
                  ]}
                >
                  <Input placeholder={t('Phone Number')} />
                </Form.Item>
                <div className="login__label">
                  {t('Password')} <span className="required">*</span>
                </div>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      min: 8,
                      message: t('validate.password.regex'),
                    },
                    {
                      required: true,
                      message: t('validate.password.required'),
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder={t('Password')} />
                </Form.Item>
                <Form.Item>
                  <Button type="warning" htmlType="submit">
                    {t('login.button register')}
                  </Button>
                  <div className="forgot--password">
                    <span>{t('login.forgot')}</span>
                  </div>
                </Form.Item>
              </Form>
            </Col>
            <Col lg={7} md={10} xs={24} sm={16}>
              <div className="register__right">
                <p className="register__right--title">{t('login.already')}</p>
                <Button onClick={() => history.push('/register')} type="ghost">
                  {t('login.button login')}
                </Button>
                <div className="term-privacy">
                  <p>
                    *<span>{t('Terms & Conditions.title')}</span>
                  </p>
                  <p>
                    {t('Terms & Conditions.content')}
                    <span>{t('Terms & Conditions.privacy')}</span>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  const { user } = state.accountReducer;
  return {
    user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (params) => dispatch(getUser(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
