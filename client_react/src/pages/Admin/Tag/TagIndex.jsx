import { Button, Input, Modal, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsTrashFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { connect } from 'react-redux';
import { deleteTag, getTag } from '../../../redux/actions';
import history from '../../../util/history';

const TagIndex = ({ getTag, tagData, totalTag, deleteTag }) => {
  const { t } = useTranslation();

  const [currentPageTag, setCurrentPageTag] = useState(1);
  const [searchTagKey, setSearchTagKey] = useState();

  useEffect(() => {
    document.title = 'Vegana | Danh mục và thẻ sản phẩm';
  }, []);

  useEffect(() => {
    getTag({
      page: currentPageTag,
      limit: 10,
      searchTagKey,
    });
  }, [currentPageTag, getTag, searchTagKey]);

  const { Search } = Input;

  const handleSearchTag = (value) => {
    setSearchTagKey(value);
    setCurrentPageTag(1);
  };

  function confirmTag(data) {
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
        deleteTag({ id: data.id });
      },
      onCancel() {},
    });
  }

  const handelChangePageTag = (page) => {
    setCurrentPageTag(page);
  };

  const renderLocationTag = () => {
    const LIMIT = 10;
    const start = (currentPageTag - 1) * LIMIT + 1;
    let end;
    if (tagData.length >= LIMIT) {
      end = (currentPageTag - 1) * LIMIT + LIMIT;
    } else end = start + tagData.length - 1;
    return `${start} - ${end}`;
  };

  return (
    <>
      <section className="admin__listUser admin__products fadeIn">
        <div className="container">
          <div className="admin__listUser--btn">
            <div className="admin__listUser--btn-search">
              <Search placeholder={t('admin.tag_search')} onSearch={handleSearchTag} enterButton />
            </div>
            <div
              className="admin__listUser--btn-create"
              onClick={() => history.push('/admin/tag/add')}
            >
              <Button type="primary">{t('admin.button_add_tag')}</Button>
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
                {tagData.length > 0 ? (
                  tagData.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>
                        <button className="button" onClick={() => confirmTag(item)}>
                          <BsTrashFill />
                        </button>
                        <button
                          className="button"
                          onClick={() => history.push(`/admin/tag/edit/${item.id}`)}
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
            {totalTag > 10 && (
              <section className="pagination">
                <div className="pagination__result">
                  {t('products.Showing')} {renderLocationTag()} {t('products.of')} {totalTag}
                  {t('products.result')}
                </div>
                <Pagination
                  current={currentPageTag}
                  onChange={handelChangePageTag}
                  total={totalTag}
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
  const { tagData, totalTag } = state.tagReducer;
  return { tagData, totalTag };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTag: (params) => dispatch(getTag(params)),
    deleteTag: (params) => dispatch(deleteTag(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagIndex);
