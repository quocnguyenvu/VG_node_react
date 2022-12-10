import { Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { dateTime } from '../../../util/dateTime';

import { useTranslation } from 'react-i18next';
import './style.scss';

const SearchDiscount = ({
  setSearchKey,
  searchKey,
  totalDiscountUser,
  discountUserData,
  isShowSearch,
  setIsShowSearch,
  setDiscount,
}) => {
  const typingTimeoutRef = useRef(null);
  const location = useLocation();
  const { t } = useTranslation();

  const [isPayment, setIsPayment] = useState();
  const [tempDiscount, setTempDiscount] = useState();

  useEffect(() => {
    setIsPayment(location.pathname === '/payment' ? true : false);
  }, [location]);

  useEffect(() => {
    if (!isShowSearch) setIsShowSearch(!!searchKey);
  }, [isShowSearch, searchKey, setIsShowSearch]);

  const handleChange = (e) => {
    const valueInput = e.target.value;
    clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setSearchKey(valueInput);
    }, 200);
  };

  const handleClickApply = () => {
    setDiscount(tempDiscount);

    const payment = JSON.parse(localStorage.getItem('infoPayment'));
    localStorage.setItem(
      'infoPayment',
      JSON.stringify({
        ...payment,
        ...(tempDiscount?.codeName && { codeName: tempDiscount?.codeName }),
      })
    );
  };

  const handleClickSearchItem = (item) => {
    setSearchKey(item.codeName);
    setTempDiscount(item);
  };

  const handleClickChoice = () => {
    setIsShowSearch(!isShowSearch);
  };

  return (
    <div>
      {isPayment ? (
        <form>
          <div className="search-discount__container">
            <div className="search-discount__input">
              <Input
                className="input"
                type="text"
                value={searchKey}
                onChange={handleChange}
                placeholder={t('infoCart.Discount code')}
              ></Input>
              <span className="search-discount__input--button" onClick={handleClickChoice}>
                {isShowSearch ? 'Ẩn' : 'Chọn'}
              </span>
            </div>
            {(isShowSearch || searchKey) && totalDiscountUser && (
              <ul
                className={`search-discount__content ${
                  isShowSearch && 'search-discount__content--active'
                }`}
              >
                {discountUserData?.map((item) => (
                  <li className="search-discount__item" key={item.id}>
                    <div className="search-discount__left">
                      <div className="search-discount__img">
                        <img
                          src="https://content.accesstrade.vn/adv/1639583427_avatar_1639583427.gif"
                          alt="img"
                        />
                      </div>
                      <div className="search-discount__info">
                        <p className="text-clamp  search-discount__info--title">
                          [ {item.title}]- Nhập mã {item.codeName} giảm ngay{' '}
                          {item.amount || item.sale}
                          {item.amount ? 'VND' : '%'}
                        </p>
                        <p className="search-discount__info--timer text-clamp text-clamp--1">{`Còn lại: ${dateTime(
                          item.dateCreate
                        )}`}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="search-discount__btn"
                      onClick={() => handleClickSearchItem(item)}
                    >
                      Dán
                    </button>
                  </li>
                ))}
                <li className="search-discount__footer">
                  <p className="search-discount__result">{`${t(
                    'header_text.search'
                  )} (${totalDiscountUser})`}</p>
                </li>
              </ul>
            )}
          </div>
          <button className="button" type="button" onClick={handleClickApply}>
            {t('infoCart.Apply')}
          </button>
        </form>
      ) : (
        <p>Mã giảm giá sẽ được nhập ở bước tiếp theo.</p>
      )}
    </div>
  );
};

export default SearchDiscount;
