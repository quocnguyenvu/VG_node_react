import React, { useEffect, useState } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { dateTime } from './../../util/dateTime';
import { addDiscountUser } from '../../redux/actions';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { message } from 'antd';
import { toastWarning } from '../../util/toast';
import { useTranslation } from 'react-i18next';
import './styles.scss';

function DiscountItem({ data, addDiscountUser }) {
  const location = useLocation();
  const { t } = useTranslation();
  const [isProfilePage, setIsProfilePage] = useState(false);

  useEffect(() => {
    if (location.pathname === '/profile') {
      setIsProfilePage(true);
    }
  }, [location]);

  const handleAddDiscount = () => {
    if (localStorage.getItem('profile')) {
      addDiscountUser({ id: data.id });
    } else toastWarning(t('action.warning'));
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(data.codeName);
    message.info('Copied');
  };

  return (
    <section className="discount__item">
      <div className="discount__wrapper ">
        <img
          src="https://content.accesstrade.vn/adv/1639583427_avatar_1639583427.gif"
          alt="img discount"
          className="discount__item--img"
        />
        <div>
          <h3 className="discount__item--name">{`[${data.title}] - Nhập mã ${
            data.codeName
          } giảm ngay ${data.sale || data.amount} ${data.sale ? '%' : 'VNĐ'}`}</h3>
          {!isProfilePage && <p className="discount__item--quantity">Còn lại {data.total} mã</p>}

          <div className="discount__wrapper1">
            <div className="discount__wrapper2">
              <AiOutlineClockCircle className="discount__item--icon" />
              <p>Hết hạn: {dateTime(data.dateExpire)}</p>
            </div>
          </div>
        </div>
        {isProfilePage ? (
          <button
            className={`discount__item--button ${data.status && 'discount__item--button-hidden'}`}
            disabled={data.status}
            onClick={handleCopyCode}
          >
            Copy
          </button>
        ) : (
          <button
            className={`discount__item--button ${data.status && 'discount__item--button-hidden'}`}
            disabled={data.status}
            onClick={handleAddDiscount}
          >
            {data.status ? 'Đã lấy' : 'Lấy mã'}
          </button>
        )}
      </div>
    </section>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addDiscountUser: (params) => dispatch(addDiscountUser(params)),
  };
};

export default connect(null, mapDispatchToProps)(DiscountItem);
