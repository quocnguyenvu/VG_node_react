import { Empty, Modal, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { connect } from 'react-redux';
import { deleteContact, getContact } from '../../../redux/actions';
import { internationalDateTime } from '../../../util/dateTime';
import './styles.scss';

function ListContact({ getContact, contactData, deleteContact, deleteData }) {
  const { contacts, total } = contactData;

  const { t } = useTranslation();

  const [current, setCurrent] = useState(1);

  const title = [
    { id: 1, title: 'STT' },
    { id: 2, title: t('admin.contact.Full Name') },
    { id: 3, title: t('admin.contact.Email') },
    { id: 4, title: t('admin.contact.Message') },
    { id: 5, title: t('admin.contact.Date Time') },
    { id: 6, title: t('admin.contact.Action') },
  ];

  useEffect(() => {
    getContact({
      page: current,
      limit: 10,
    });
  }, [current, deleteData]);

  const handleClickDelete = (message, id) => {
    Modal.confirm({
      title: 'Confirm',
      content: (
        <p>
          {t('Contact.Contact Delete')} <span style={{ fontWeight: 600 }}>{`#${message}`}</span> ?
        </p>
      ),
      okText: 'OK',
      cancelText: 'CANCEL',
      onOk() {
        deleteContact({ id });
      },
      onCancel() {},
    });
  };

  return (
    <section className="admin__listUser admin__products fadeIn">
      <div className="container">
        <div className="admin__listUser--tableNormal">
          <table className="table">
            <thead>
              <tr>
                {title.map((item) => (
                  <td key={item.id} className={item.id}>
                    {item.title}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {contacts?.length ? (
                contacts?.map((item, index) => (
                  <tr className="table__row" key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td className="listContact__4">{item.message}</td>
                    <td>{internationalDateTime(item.datetime)}</td>
                    <td className="listContact__6">
                      <RiDeleteBin5Fill
                        className="order__icon order__icon--delete"
                        onClick={() => handleClickDelete(item.message, item.id)}
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
          {contacts?.length ? (
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

// export default ListContact;
const mapStateToProps = (state) => {
  const { contactData, deleteData } = state.contactReducer;
  return {
    contactData,
    deleteData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getContact: (params) => dispatch(getContact(params)),
    deleteContact: (params) => dispatch(deleteContact(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListContact);
