import { Button, Input, Modal, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsTrashFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { connect } from 'react-redux';
import { deleteCategory, getCategory } from '../../../redux/actions';
import history from '../../../util/history';

const CategoryIndex = ({ getCategory, categoryData, totalCategory, deleteCategory }) => {
  const { t } = useTranslation();
  const [currentPageCategory, setCurrentPageCategory] = useState(1);

  const [searchCategoryKey, setSearchCategoryKey] = useState();

  useEffect(() => {
    document.title = 'Vegana | Danh mục và thẻ sản phẩm';
  }, []);

  useEffect(() => {
    getCategory({
      page: currentPageCategory,
      limit: 10,
      searchCategoryKey,
    });
  }, [currentPageCategory, getCategory, searchCategoryKey]);

  const { Search } = Input;

  const handleSearchCategory = (value) => {
    setSearchCategoryKey(value);
    setCurrentPageCategory(1);
  };

  function confirmCategory(data) {
    Modal.confirm({
      title: 'Confirm',
      content: (
        <p>
          {t('admin.discount.discount delete')}{' '}
          <span style={{ fontWeight: 600 }}>{data.title}</span> ?
        </p>
      ),
      okText: 'OK',
      cancelText: 'CANCEL',
      onOk() {
        deleteCategory({ id: data.id });
      },
      onCancel() {},
    });
  }

  const handelChangePageCategory = (page) => {
    setCurrentPageCategory(page);
  };

  const renderLocationCategory = () => {
    const LIMIT = 10;
    const start = (currentPageCategory - 1) * LIMIT + 1;
    let end;
    if (categoryData.length >= LIMIT) {
      end = (currentPageCategory - 1) * LIMIT + LIMIT;
    } else end = start + categoryData.length - 1;
    return `${start} - ${end}`;
  };

  return (
    <>
      <section className="admin__listUser admin__products fadeIn">
        <div className="container">
          <div className="admin__listUser--btn">
            <div className="admin__listUser--btn-search">
              <Search
                placeholder={t('admin.category_search')}
                onSearch={handleSearchCategory}
                enterButton
              />
            </div>
            <div
              className="admin__listUser--btn-create"
              onClick={() => history.push('/admin/category/add')}
            >
              <Button type="primary">{t('admin.button_add_category')}</Button>
            </div>
          </div>
          <div className="admin__listUser--tableNormal">
            <table>
              <thead>
                <tr>
                  <td>{t('admin.no')}</td>
                  <td>{t('admin.name')}</td>
                  <td>{t('admin.actions')}</td>
                </tr>
              </thead>
              <tbody>
                {categoryData.length > 0 ? (
                  categoryData.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>
                        <button className="button" onClick={() => confirmCategory(item)}>
                          <BsTrashFill />
                        </button>
                        <button
                          className="button"
                          onClick={() => history.push(`/admin/category/edit/${item.id}`)}
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', padding: '50px 0' }}>
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="admin__listUser--pagination">
            {totalCategory > 10 && (
              <section className="pagination">
                <div className="pagination__result">
                  {t('products.Showing')} {renderLocationCategory()} {t('products.of')}
                  {totalCategory} {t('products.result')}
                </div>
                <Pagination
                  current={currentPageCategory}
                  onChange={handelChangePageCategory}
                  total={totalCategory}
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
  const { categoryData, totalCategory } = state.categoryReducer;
  return { categoryData, totalCategory };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategory: (params) => dispatch(getCategory(params)),
    deleteCategory: (params) => dispatch(deleteCategory(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryIndex);
