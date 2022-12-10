import React ,{useState} from 'react';
import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';

import InfoManage from '../../../components/Profile/InfoManage/index'
import CartManage from '../../../components/Profile/CartManage/index'
import ListDiscount from '../../../components/ListDiscount/index'

import './style.scss';

const { TabPane } = Tabs;

function Profile() {
  const { t } = useTranslation();
  const [tabValue,setTabValue] = useState('1')
  const handleChange = (value) => {
    setTabValue(value)
  }

  return (
    <>
      <Tabs onChange={handleChange} tabPosition='left'>
        <TabPane tab={t('Info Manage')} key="1">
          <InfoManage tabValue={tabValue}/>
        </TabPane>
        <TabPane tab={t('Order Manage')} key="2">
          <CartManage tabValue={tabValue}/>
        </TabPane>
        <TabPane tab={t("List Discount")} key="3">
          <ListDiscount />
        </TabPane>
    </Tabs>
    </>
  );
}

export default Profile;
