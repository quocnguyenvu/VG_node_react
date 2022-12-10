import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { Modal, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { updateCart, deleteCart } from '../../../../redux/actions';
import './styles.scss';
import history from '../../../../util/history';

const CartItem = ({ item, updateCart, deleteCart }) => {
  const { confirm } = Modal;
  const { t } = useTranslation();
  const [valueInput, setValueInput] = useState(item.quantity);

  const contentModal = (data) => (
    <div className="modal">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div className="modal__img ">
            <img src={data.imgs[0]} alt="modal" className=""></img>
          </div>
        </Col>
        <Col span={12}>
          <div className="modal__content">
            <h3>{data.name}</h3>
            <p>
              <span>{t('cart.Unit')}</span>1 {data.unit}
            </p>
            <p>{`$${data.price.toLocaleString()}`}</p>
          </div>
        </Col>
      </Row>
    </div>
  );

  const modalInc = (data, value) => {
    confirm({
      title: `${t('cart.You can only order up to 30 products')}`,
      content: <>{contentModal(data)}</>,
      okText: `${t('cart.Yes')}`,
      cancelText: `${t('cart.No')}`,
      onOk() {
        setValueInput(30);
        updateCart({ id: item._id, productId: data._id, quantity: value });
      },
      onCancel() {
        setValueInput(1);
        updateCart({ id: item._id, productId: data._id, quantity: 1 });
      },
    });
  };

  const modalDec = (data, value) => {
    confirm({
      title: `${t('cart.Are you sure delete this product?')}`,
      content: <>{contentModal(data)}</>,
      okText: `${t('cart.Yes')}`,
      cancelText: `${t('cart.No')}`,
      onOk() {
        deleteCart({ id: item._id });
      },
      onCancel() {
        setValueInput(value);
        updateCart({ id: item._id, productId: data._id, quantity: value });
      },
    });
  };

  const handleChangeInput = (e, data) => {
    let value = parseInt(e.target.value);
    if (isNaN(value)) {
      setValueInput('');
    } else if (value > 0 && value <= 30) {
      updateCart({ id: item._id, productId: data._id, quantity: value });
      setValueInput(value);
    } else if (value > 30) {
      modalInc(data, value);
    } else if (value <= 0) {
      value = value + 1;
      modalDec(data, value);
    }
  };

  const handleIncreaseInput = (data) => {
    let value = parseInt(valueInput + 1);
    setValueInput(value);
    if (value > 30) {
      modalInc(data, value);
    } else updateCart({ id: item._id, productId: data._id, quantity: value });
  };

  const handleDecreaseInput = (data) => {
    let value = parseInt(valueInput - 1);
    setValueInput(value);
    if (value <= 0) {
      modalDec(data, value);
    } else updateCart({ id: item._id, productId: data._id, quantity: value });
  };

  return (
    <>
      {item && (
        <tr className="cart__product--item">
          <td
            className="cart__product--img"
            onClick={() => history.push(`/product/${item.productId._id}`)}
          >
            <img src={item.productId.imgs[0]} alt="anh cart" />
          </td>
          <td
            className="cart__product--info"
            onClick={() => history.push(`/product/${item.productId._id}`)}
          >
            <h3>{item.productId.name}</h3>
            <p>
              <span>{t('cart.Unit')}</span>1 {item.productId.unit}
            </p>
            <p>${item.productId.price.toLocaleString()} VND</p>
          </td>
          <td className="cart__product--amount">
            <div>
              <button className="" onClick={() => handleDecreaseInput(item.productId)}>
                -
              </button>
              <input
                value={valueInput}
                className=""
                type="number"
                onChange={(e) => handleChangeInput(e, item.productId)}
              ></input>
              <button className="" onClick={() => handleIncreaseInput(item.productId)}>
                +
              </button>
            </div>
          </td>
          <td className="cart__product--price">
            {(item.productId.price * valueInput).toLocaleString()} VND
          </td>
          <td
            className="cart__product--remove"
            onClick={() => modalDec(item.productId, item.quantity)}
          >
            <FaTrash />
          </td>
        </tr>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartData } = state.cartReducer;

  return {
    cartData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateCart: (params) => dispatch(updateCart(params)),
    deleteCart: (params) => dispatch(deleteCart(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
