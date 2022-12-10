import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { editUserByAdmin } from '../../../../redux/actions';
import { FaEdit } from 'react-icons/fa';
import { Modal, Button, Select } from 'antd';
import './style.scss';

const ModalModify = ({ editUserByAdmin, item }) => {
  const { t } = useTranslation();
  const { Option } = Select;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectRole, setSelectRole] = useState(item.role);

  function handleChange(value) {
    setSelectRole(value);
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmitAdd = () => {
    editUserByAdmin({
      id: item.id,
      role: selectRole,
    });
    setIsModalVisible(false);
  };
  return (
    <>
      <div className="admin__listUser--modal">
        <button className="button" onClick={showModal}>
          <FaEdit />
        </button>
        <Modal
          title="MODIFY USER"
          visible={isModalVisible}
          onCancel={handleCancel}
          className="listUser__modal"
        >
          <Formik
            initialValues={{
              firstName: item.firstName,
              lastName: item.lastName,
              address: item.address,
              phone: item.phoneNumber,
              email: item.email,
            }}
            enableReinitialize
            onSubmit={(value, { resetForm }) => {
              handleSubmitAdd(value);
              resetForm();
            }}
          >
            <Form className="admin__listUser--modal-form">
              <div className="modal__create-input">
                <label htmlFor="phone">{t('Profile.account.phone')}</label>
                <div>
                  <Field id="phone" type="text" name="phone" disabled />
                </div>
              </div>
              <div className="modal__create-input">
                <label htmlFor="firstName">
                  {t('Profile.account.first')} <span>*</span>
                </label>
                <div>
                  <Field id="firstName" type="text" name="firstName" disabled />
                </div>
              </div>
              <div className="modal__create-input">
                <label htmlFor="lastName">
                  {t('Profile.account.last')} <span>*</span>
                </label>
                <div>
                  <Field id="lastName" type="text" name="lastName" disabled />
                </div>
              </div>

              <div className="modal__create-input">
                <label htmlFor="email">Email</label>
                <div>
                  <Field id="email" type="text" name="email" disabled />
                </div>
              </div>
              <div className="modal__create-input">
                <label htmlFor="address">{t('Profile.account.address')}</label>
                <div>
                  <Field id="address" type="text" name="address" disabled />
                </div>
              </div>

              <div className="modal__create-input modal__create-input-modify">
                <label htmlFor="password">{t('Profile.account.role')}</label>
                <div>
                  <Select
                    defaultValue={item.role || 'user'}
                    style={{ width: 120 }}
                    onChange={handleChange}
                  >
                    <Option value="user">{t('Profile.account.user')}</Option>
                    <Option value="admin">{t('Profile.account.admin')}</Option>
                  </Select>
                </div>
              </div>
              <div className="modal__form-btn">
                <Button type="primary" htmlType="submit">
                  SUBMIT
                </Button>
                <Button htmlType="reset" type="primary" onClick={handleCancel}>
                  CANCEL
                </Button>
              </div>
            </Form>
          </Formik>
        </Modal>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { userEdit, isLoadingEdit } = state.accountReducer;
  return {
    userEdit,
    isLoadingEdit,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    editUserByAdmin: (params) => dispatch(editUserByAdmin(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalModify);
