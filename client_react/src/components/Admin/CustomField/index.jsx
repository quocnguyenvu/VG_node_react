import { Row, Col } from 'antd';
import React from 'react';
import { Input } from 'antd';
import { Field, ErrorMessage } from 'formik';
import { FaStarOfLife } from 'react-icons/fa';

import './styles.scss';
const CustomField = ({ name, type, placeholder, label, required, disabled }) => {
  const { TextArea } = Input;
  return (
    <Row align="middle">
      <Col md={6}>
        <label htmlFor="title">
          {label}
          {required && <FaStarOfLife />}
        </label>
      </Col>
      <Col md={18}>
        <Field
          name={name}
          render={({ field }) =>
            type !== 'textarea' ? (
              <Input
                {...field}
                placeholder={placeholder}
                type={type}
                className="form__control--input"
                disabled={disabled}
              />
            ) : (
              <TextArea
                {...field}
                placeholder={placeholder}
                type={type}
                className="form__control--input"
                disabled={disabled}
              ></TextArea>
            )
          }
        />
        <div className="text-danger">
          <ErrorMessage name={name} disabled={disabled} />
        </div>
      </Col>
    </Row>
  );
};

export default CustomField;
