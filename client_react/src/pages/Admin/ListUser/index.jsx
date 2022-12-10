import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Pagination, Input, Modal, Empty, Switch } from 'antd';
import { getListUser, deleteUser, editUserByAdmin } from '../../../redux/actions';
import { FaTrashAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { titleCase } from '../../../util/string';
import ModalCreate from './ModalCreate';
import ModalModify from './ModalModify';
import './style.scss';

const ListUser = ({
  deleteUser,
  getListUser,
  listUser,
  totalUsers,
  adminCreate,
  userEdit,
  editUserByAdmin,
}) => {
  const [page, setPage] = useState(1);
  const [isDeleted, setIsDeleted] = useState(false);
  const [search, setSearch] = useState('');
  const [searchKey, setSearchKey] = useState();
  const typingTimeoutRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = 'Vegana | Trang Quản lý người dùng';
    getListUser({
      page,
      limit: 10,
      search: searchKey,
    });
  }, [page, adminCreate, isDeleted, userEdit, searchKey]);

  const { Search } = Input;

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
      setPage(1);
    }, 1000);
  };

  function confirm(data) {
    Modal.confirm({
      title: 'Confirm',
      content: (
        <p>
          {t('admin.listUser.user delete')}{' '}
          <span style={{ fontWeight: 600 }}>{titleCase(data.fullName)}</span> ?
        </p>
      ),
      cancelText: 'CANCEL',
      okText: 'OK',
      onOk() {
        deleteUser({ id: data.id });
        setIsDeleted(!isDeleted);
      },
      onCancel() {},
    });
  }

  const onChangeStatus = (e, id) => {
    const status = e ? 'activated' : 'blocked';
    editUserByAdmin({ id, status });
  };

  const renderLocationProduct = () => {
    const start = (page - 1) * 12 + 1;
    let end;
    if (listUser.length >= 12) {
      end = (page - 1) * 12 + 12;
    } else end = start + listUser.length - 1;
    return `${start} - ${end}`;
  };

  return (
    <>
      <section className="admin__listUser fadeIn">
        <div className="container">
          <div className="admin__listUser--btn">
            <div className="admin__listUser--btn-search">
              <Search
                placeholder={t('admin.user.Search a user')}
                value={search}
                onChange={handleChange}
                enterButton
              />
            </div>
            {/* <div className="admin__listUser--btn-create">
              <ModalCreate setIsDeleted={setIsDeleted} />
            </div> */}
          </div>
          <div className="admin__listUser--tableNormal">
            <table>
              <thead>
                <tr>
                  <td>STT</td>
                  <td>{t('admin.table.name')}</td>
                  <td>{t('admin.table.phone')}</td>
                  <td>{t('admin.user.Email')}</td>
                  <td>{t('admin.table.role')}</td>
                  <td>{t('admin.table.action')}</td>
                  <td>{t('admin.table.status')}</td>
                </tr>
              </thead>
              <tbody>
                {listUser?.length > 0 ? (
                  listUser?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{titleCase(item.fullName)}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.email}</td>
                      <td>{titleCase(item.role)}</td>
                      <td>
                        <div>
                          <ModalModify item={item} />
                          <button className="button" onClick={() => confirm(item)}>
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                      <td>
                        <Switch
                          checkedChildren="activated"
                          unCheckedChildren="blocked"
                          defaultChecked={item.status === 'activated' ? true : false}
                          onChange={(e) => onChangeStatus(e, item.id)}
                        />
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
            {totalUsers > 10 && (
              <section className="pagination">
                <div className="pagination__result">
                  {t('products.Showing')} {renderLocationProduct()} {t('products.of')} {totalUsers}{' '}
                  {t('products.result')}
                </div>
                <Pagination
                  current={page}
                  onChange={(page) => setPage(page)}
                  total={totalUsers}
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
  const { listUser, deleteUser, adminCreate, userEdit, isLoading } = state.accountReducer;

  return {
    listUser: listUser.users,
    totalUsers: listUser.total,
    deleteUser,
    adminCreate,
    userEdit,
    isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getListUser: (params) => dispatch(getListUser(params)),
    deleteUser: (params) => dispatch(deleteUser(params)),
    editUserByAdmin: (params) => dispatch(editUserByAdmin(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListUser);
