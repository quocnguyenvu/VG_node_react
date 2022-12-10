import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Pagination, Input, Modal, Empty, Button } from 'antd';
import { getProducts, deleteProduct } from '../../../redux/actions';
import history from '../../../util/history';
import { BsTrashFill } from 'react-icons/bs';
import { IoEyeSharp } from 'react-icons/io5';
import { FaEdit } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

import './styles.scss';

const ListUser = ({ getProducts, deleteProduct, productsData, totalProduct }) => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState('');
  const [searchKey, setSearchKey] = useState();
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    document.title = 'Vegana | Quản lý sản phẩm';
  }, []);

  useEffect(() => {
    getProducts({
      page: current,
      limit: 10,
      searchKey: searchKey,
    });
  }, [current, searchKey]);

  const { Search } = Input;

  const handleChange = (e) => {
    const valueInput = e.target.value;
    setSearch(valueInput);

    clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setSearchKey(valueInput);
      setCurrent(1);
    }, 800);
  };

  function confirm(data) {
    Modal.confirm({
      title: 'Confirm',
      content: (
        <p>
          {t('admin.products.product delete')} <span style={{ fontWeight: 600 }}>{data.name}</span>{' '}
          ?
        </p>
      ),
      okText: 'OK',
      cancelText: 'CANCEL',
      onOk() {
        deleteProduct({ id: data.id });
      },
      onCancel() {},
    });
  }

  const handelChangePage = (page) => {
    setCurrent(page);
  };

  const renderLocationProduct = () => {
    const LIMIT = 10;
    const start = (current - 1) * LIMIT + 1;
    let end;
    if (productsData.length >= LIMIT) {
      end = (current - 1) * LIMIT + LIMIT;
    } else end = start + productsData.length - 1;
    return `${start} - ${end}`;
  };

  return (
    <>
      <section className="admin__listUser admin__products fadeIn">
        <div className="container">
          <div className="admin__listUser--btn">
            <div className="admin__listUser--btn-search">
              <Search
                placeholder={t('admin.products.Search a product')}
                value={search}
                onChange={handleChange}
                enterButton
              />
            </div>
            <div
              className="admin__listUser--btn-create"
              onClick={() => history.push('/admin/products/add')}
            >
              <Button type="primary">{t('admin.products.Add product')}</Button>
            </div>
          </div>
          <div className="admin__listUser--tableNormal">
            <table>
              <thead>
                <tr>
                  <td>{t('admin.products.Key')}</td>
                  <td>{t('admin.products.Name')}</td>
                  <td>{t('admin.products.Price')}</td>
                  <td>{t('admin.products.Discount')}</td>
                  <td>{t('admin.products.Current price')}</td>
                  <td>{t('admin.products.Category')}</td>
                  <td>{t('admin.products.Tag')}</td>
                  <td>{t('admin.products.Total')}</td>
                  <td>{t('admin.products.Action')}</td>
                </tr>
              </thead>
              <tbody>
                {totalProduct > 0 ? (
                  productsData.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.price.toLocaleString()}</td>
                      <td>{item.sale}%</td>
                      <td>{Math.ceil(item.price * (1 - item.sale / 100)).toLocaleString()}</td>
                      <td>{item.categoryId.name}</td>
                      <td>{item.tagId.name}</td>
                      <td>{item.total}</td>
                      <td>
                        <button
                          className="button"
                          onClick={() => history.push(`/product/${item.id}`)}
                        >
                          <IoEyeSharp />
                        </button>
                        <button
                          className="button"
                          onClick={() => history.push(`/admin/products/edit/${item.id}`)}
                        >
                          <FaEdit />
                        </button>

                        <button className="button" onClick={() => confirm(item)}>
                          <BsTrashFill />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <Empty />
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="admin__listUser--pagination">
            {totalProduct > 10 && (
              <section className="pagination">
                <div className="pagination__result">
                  {t('products.Showing')} {renderLocationProduct()} {t('products.of')}{' '}
                  {totalProduct} {t('products.result')}
                </div>
                <Pagination
                  current={current}
                  onChange={handelChangePage}
                  total={totalProduct}
                  defaultPageSize={10}
                />
              </section>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  const { deleteProduct, productsData, totalProduct } = state.productReducer;
  return {
    deleteProduct,
    productsData,
    totalProduct,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (params) => dispatch(getProducts(params)),
    deleteProduct: (params) => dispatch(deleteProduct(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListUser);
