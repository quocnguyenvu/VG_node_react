import { Empty, Input, Modal, Pagination } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsEyeFill, BsReplyAllFill } from 'react-icons/bs';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { connect } from 'react-redux';
import { deleteComment, getCommentAdmin, getProducts } from '../../../redux/actions';
import { internationalDateTime } from '../../../util/dateTime';
import history from '../../../util/history';
import { titleCase } from '../../../util/string';
import { toastSuccess } from '../../../util/toast';
import './styles.scss';

function ListComment({
  productsData,
  getProducts,
  deleteData,
  deleteComment,
  listCommentAdmin,
  getCommentAdmin,
}) {
  const { Search } = Input;
  const [search, setSearch] = useState('');
  const [searchKey, setSearchKey] = useState();
  const [current, setCurrent] = useState(1);
  const { t } = useTranslation();

  const typingTimeoutRef = useRef(null);

  const { reviews, total } = listCommentAdmin;

  const title = [
    { id: 1, title: 'STT' },
    { id: 2, title: t('admin.comment.Name Product') },
    { id: 3, title: t('admin.comment.User Name') },
    { id: 4, title: t('admin.comment.Title') },
    { id: 5, title: t('admin.comment.Content') },
    { id: 6, title: t('admin.comment.Rating') },
    { id: 7, title: t('admin.comment.Date Time') },
    { id: 8, title: t('admin.comment.Action') },
  ];

  useEffect(() => {
    document.title = 'Vegana | Trang Quản lý đánh giá';
    getCommentAdmin({
      page: current,
      limit: 10,
      search: searchKey,
    });
  }, [searchKey, current, deleteData, getCommentAdmin]);

  useEffect(() => {
    getProducts({});
  }, [getProducts]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      const formValue = {
        search: value,
      };
      setSearchKey(formValue.search);
    }, 1000);
  };

  const handleClickDelete = (id, title) => {
    Modal.confirm({
      title: 'Confirm',
      content: (
        <p>
          {t('admin.comment.comment delete')}{' '}
          <span style={{ fontWeight: 600 }}>{titleCase(title)}</span> ?
        </p>
      ),
      okText: 'OK',
      cancelText: 'CANCEL',
      onOk() {
        deleteComment({ id });
      },
      onCancel() {},
    });
  };

  const renderNameProduct = (idProduct) => {
    let string = '';
    const index = productsData.findIndex((item) => item.id === idProduct);
    string = productsData[index]?.name;
    return string;
  };

  return (
    <section className="admin__listUser admin__products fadeIn">
      <div className="container">
        <div className="comment__search">
          <Search
            placeholder={t('admin.comment.Search')}
            value={search}
            onChange={handleChange}
            enterButton
          />
        </div>
        <div className="admin__listUser--tableNormal">
          <table className="table">
            <thead>
              <tr>
                {title.map((item) => (
                  <td key={item.id}>{item.title}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {reviews?.length ? (
                reviews?.map((item, index) => (
                  <tr className="table__row" key={index}>
                    <td>{index + 1}</td>
                    <td>{renderNameProduct(item?.productId?._id)}</td>
                    <td>{item?.userId?.fullName}</td>
                    <td>{item?.title}</td>
                    <td className="text-clamp text-clamp--2">{item?.description}</td>
                    <td>{item?.rate}</td>
                    <td>{internationalDateTime(item?.dateCreate)}</td>
                    <td className="comment__button">
                      <BsEyeFill
                        className="comment__icon comment__icon--reply"
                        onClick={() => history.push(`/product/${item.productId._id}`)}
                      />
                      <BsReplyAllFill
                        className="comment__icon comment__icon--reply"
                        onClick={() => toastSuccess('Sắp ra mắt !')}
                      />
                      <RiDeleteBin5Fill
                        className="comment__icon comment__icon--delete"
                        onClick={() => handleClickDelete(item.id, item.title)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <Empty />
              )}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          {total ? (
            <Pagination
              current={current}
              onChange={(page) => setCurrent(page)}
              total={total}
              defaultPageSize={10}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  const { deleteData, listCommentAdmin } = state.productDetailReducer;
  const { productsData } = state.productReducer;
  return {
    deleteData,
    listCommentAdmin,
    productsData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (params) => dispatch(deleteComment(params)),
    getCommentAdmin: (params) => dispatch(getCommentAdmin(params)),
    getProducts: (params) => dispatch(getProducts(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListComment);
