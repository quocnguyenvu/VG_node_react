import { Col, Form, Input, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { GiPositionMarker } from 'react-icons/gi';
import { MdEmail } from 'react-icons/md';
import { connect } from 'react-redux';
import { createContact } from '../../../redux/actions';
import Breadcrumb from './../../../components/Breadcrumb/index';
import './styles.scss';

function Contact({ createContact }) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const handleSubmitForm = (values) => {
    createContact({
      ...values,
      datetime: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    form.resetFields();
  };

  return (
    <div className="contact">
      <Breadcrumb title="Contact Us" />
      <div className="contact__container">
        <section className="contact__title">
          <h1>{t('Contact.title')}</h1>
          <p>{t('Contact.description')}</p>
        </section>
        <section className="contact__map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245368.26104979432!2d107.93803935521751!3d16.07176349243398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c792252a13%3A0x1df0cb4b86727e06!2zxJDDoCBO4bq1bmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1636875805807!5m2!1svi!2s"
            width="1150"
            height="450"
            allowfullscreen
          />
        </section>
        <Row>
          <Col xs={24} sm={12} md={12} lg={12}>
            <div className="contact__message">
              <h3 className="contact__subtitle">{t('Contact.Drop us message')}</h3>
              <Form
                form={form}
                name="contact"
                className="contact__form"
                onFinish={(values) => handleSubmitForm(values)}
                scrollToFirstError
              >
                <div className="login__label">{t('Contact.Name')}</div>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: t('validate.name.required'),
                    },
                    {
                      max: 40,
                      message: t('validate.name.max'),
                    },
                  ]}
                >
                  <Input placeholder={t('Contact.Enter your name')} />
                </Form.Item>
                <div className="login__label">{t('Contact.Email')}</div>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: t('validate.email.regex'),
                    },
                    {
                      required: true,
                      message: t('validate.email.required'),
                    },
                  ]}
                >
                  <Input placeholder={t('Contact.Enter your email address')} />
                </Form.Item>
                <div className="login__label">{t('Contact.Message')}</div>
                <Form.Item
                  name="message"
                  rules={[
                    {
                      required: true,
                      message: t('validate.Message.required'),
                    },
                    {
                      max: 1000,
                      message: t('validate.Message.max'),
                    },
                  ]}
                >
                  <TextArea placeholder={t('Contact.Your message here')} />
                </Form.Item>
                <Form.Item>
                  <button type="submit" className="button button-round--lg button-primary">
                    {t('Contact.SUBMIT')}
                  </button>
                </Form.Item>
              </Form>
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <div className="contact__info">
              <h3 className="contact__subtitle">{t('Contact.Get in touch')}</h3>
              <p>{t('Contact.Get description')}</p>
              <div className="">
                <div className="contact__wrapper">
                  <GiPositionMarker className="contact__wrapper--icon" />
                  <p>Đà Nẵng, Việt Nam</p>
                </div>
                <div className="contact__wrapper">
                  <BsFillTelephoneFill className="contact__wrapper--icon" />
                  <p>0123 456 789</p>
                </div>
                <div className="contact__wrapper">
                  <MdEmail className="contact__wrapper--icon" />
                  <p>Vegana.danang@gmail.com</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

// export default Contact;

const mapStateToProps = (state) => {};
const mapDispatchToProps = (dispatch) => {
  return {
    createContact: (params) => dispatch(createContact(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Contact);
