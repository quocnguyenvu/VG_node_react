import { ContainerOutlined, PieChartOutlined } from '@ant-design/icons';
import { Menu, Modal } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineHome } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { FaRegCommentDots } from 'react-icons/fa';
import { RiBillLine, RiContactsBookLine, RiLogoutBoxRLine, RiBookmark2Line } from 'react-icons/ri';
import { GiJerusalemCross } from 'react-icons/gi';
import history from '../../util/history';
import './style.scss';

const Admin = () => {
  const { t } = useTranslation();
  document.title = 'Vegana | Trang Admin';
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [authData, setAuthData] = useState(JSON.parse(localStorage.getItem('profile')));

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    history.push('/');
    localStorage.clear();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="admin-navbar fadeIn" style={{ width: 256 }}>
        <Menu
          inlineCollapsed={collapsed}
          defaultSelectedKeys={['3']}
          defaultOpenKeys={['3']}
          mode="inline"
          theme="dark"
        >
          {authData && (
            <div className="admin__account">
              <div className="admin__account--avt">
                <img src={authData?.avatar} alt="avatar" />
              </div>
              <p className="admin__account--name">{authData?.fullName}</p>
            </div>
          )}
          <Menu.Item key="2" icon={<AiOutlineHome />} onClick={() => history.push('/')}>
            {t('admin.home')}
          </Menu.Item>
          <Menu.Item onClick={() => history.push('/admin')} key="3" icon={<PieChartOutlined />}>
            {t('admin.Dashboard.title')}
          </Menu.Item>
          <Menu.Item onClick={() => history.push('/admin/listUser')} key="4" icon={<BiUser />}>
            {t('admin.listUser.title')}
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<ContainerOutlined />}
            onClick={() => history.push('/admin/products')}
          >
            {t('admin.listProduct.title')}
          </Menu.Item>
          <Menu.Item key="6" icon={<RiBillLine />} onClick={() => history.push('/admin/listOrder')}>
            {t('admin.listOrder.title')}
          </Menu.Item>
          <Menu.Item
            key="7"
            icon={<FaRegCommentDots />}
            onClick={() => history.push('/admin/listComment')}
          >
            {t('admin.listComment.title')}
          </Menu.Item>
          <Menu.Item
            key="8"
            icon={<GiJerusalemCross />}
            onClick={() => history.push('/admin/discount')}
          >
            {t('admin.discount.title')}
          </Menu.Item>
          <Menu.Item
            key="9"
            icon={<RiBookmark2Line />}
            onClick={() => history.push('/admin/category')}
          >
            {t('admin.category_side_bar')}
          </Menu.Item>
          <Menu.Item key="10" icon={<RiBookmark2Line />} onClick={() => history.push('/admin/tag')}>
            {t('admin.tag_side_bar')}
          </Menu.Item>
          <Menu.Item
            key="11"
            icon={<RiContactsBookLine />}
            onClick={() => history.push('/admin/listContact')}
          >
            {t('admin.listContact.title')}
          </Menu.Item>
          <Menu.Item key="12" icon={<RiLogoutBoxRLine />} onClick={showModal}>
            {t('logout')}
          </Menu.Item>
        </Menu>
      </div>
      <Modal title="Notification" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Do you want to sign out?</p>
      </Modal>
    </>
  );
};
export default Admin;
