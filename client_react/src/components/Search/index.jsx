import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiSearch } from 'react-icons/bi';
import { connect } from 'react-redux';
import { getProducts, setFlagSearchChange, setValueSearch } from '../../redux/actions';
import history from '../../util/history';
import { toastError } from '../../util/toast';
import './styles.scss';

function Search({
  value,
  setValue,
  totalProduct,
  setFlagSearchChange,
  setValueSearch,
  productsData,
  getProducts,
}) {
  const { t, i18n } = useTranslation();

  const [flag, setFlag] = useState(true); //Biến cờ để bật/tắt list kết quả tìm kiếm

  const typingTimeoutRef = useRef(null); //Debounce

  //debounce
  const handleChangeSearch = (e) => {
    setValue(e.target.value);
    setFlag(true);
    //Điều chỉnh thanh Scroll.
    if (e.target.value) setFlagSearchChange(true);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (e.target.value)
        getProducts({
          searchKey: e.target.value,
        });
    }, 300);
  };

  const handleClickSearch = () => {
    setValueSearch(value);
    setFlag(false);
    setFlagSearchChange(false);
    if (value === '') toastError(t('validate.search.required'));
    else if (totalProduct) history.push('/products');
    else history.push('/notFound');
  };

  const handleClickSearchItem = (id) => {
    setFlag(false);
    setFlagSearchChange(false);
    history.push(`/product/${id}`);
  };

  return (
    <div className="header__search">
      <div className="header__search--form">
        <input
          value={value}
          placeholder="Search..."
          className="header__search--input"
          onChange={(e) => handleChangeSearch(e)}
        ></input>
        <div className="icon icon-round" onClick={handleClickSearch}>
          <BiSearch />
        </div>

        {value && totalProduct && flag ? (
          <ul className="header__search--list">
            {productsData.map((item) => (
              <li
                className="header__search--item"
                key={item.id}
                onClick={() => handleClickSearchItem(item.id)}
              >
                {item.imgs && <img src={item.imgs[0]} alt="img" className="header__search--img" />}
                <div className="header__search--wrapper">
                  <span>{item.name}</span>
                  <span>{`$${item.price.toLocaleString()} USD`}</span>
                </div>
              </li>
            ))}
            <li className="header__search--item">
              <p className="header__search--result" onClick={handleClickSearch}>{`${t(
                'header_text.search'
              )} (${totalProduct})`}</p>
            </li>
          </ul>
        ) : null}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { productsData, totalProduct } = state.productReducer;
  return {
    productsData,
    totalProduct,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValueSearch: (params) => dispatch(setValueSearch(params)),
    setFlagSearchChange: (params) => dispatch(setFlagSearchChange(params)),
    getProducts: (params) => dispatch(getProducts(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
