import { Checkbox, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiCloseLine } from 'react-icons/ri';
import { connect } from 'react-redux';
import { getSidebar } from '../../../../redux/actions';
import useWindowDimensions from '../../../../util/width';
import './styles.scss';

const arrPrice = ['0-100.000', '100.000-200.000', '200.000-400.000'];

const Sidebar = ({
  getSidebar,
  sidebarData,
  filterProducts,
  setFilterProducts,
  setCurrentPage,
  products,
  setBannerData,
}) => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const [isFilter, setIsFilter] = useState(false);
  const [arrFilter, setArrFilter] = useState([]);
  const [priceValue, setPriceValue] = useState([]);

  useEffect(() => {
    getSidebar();
  }, [getSidebar]);

  const handelChangePrice = (value) => {
    switch (value[0]) {
      case 1:
        setFilterProducts({
          ...filterProducts,
          price: [0, 100000],
        });
        break;
      case 2:
        setFilterProducts({
          ...filterProducts,
          price: [100001, 200000],
        });
        break;
      case 3:
        setFilterProducts({
          ...filterProducts,
          price: [200001, 400000],
        });
        break;
      default:
        break;
    }

    const tempFilter = arrPrice.filter((item, index) => value.indexOf(index + 1) > -1);
    setPriceValue([...value]);
    setArrFilter({
      ...arrFilter,
      price: [...tempFilter],
    });
    setIsFilter(true);
    setCurrentPage(1);
  };

  const handelChangeCategory = (value) => {
    const tempFilter = [];
    const arr = sidebarData.categoryData.filter((item) => value.indexOf(item.id) > -1);
    setBannerData({ ...arr[0] });
    arr.forEach((element) => {
      tempFilter.push(element.name);
    });

    setArrFilter({
      ...arrFilter,
      category: [...tempFilter],
    });
    setFilterProducts({
      ...filterProducts,
      category: value,
    });
    setIsFilter(true);
    setCurrentPage(1);
  };

  const handelClickTag = ({ id, name }) => {
    setArrFilter({
      ...arrFilter,
      tag: [name],
    });
    setFilterProducts({
      ...filterProducts,
      tag: id,
    });
    setIsFilter(true);
    setCurrentPage(1);
  };

  const handelClearFilter = () => {
    setIsFilter(false);
    setFilterProducts({
      category: [],
      price: [],
      tag: null,
      bestSelling: false,
      priceLowToHigh: false,
      priceHighToLow: false,
      date: false,
    });
    setArrFilter([]);
    setPriceValue([]);
    setCurrentPage(1);
  };

  const renderFilterCategory = () => {
    return sidebarData?.categoryData?.map((item) => (
      <Checkbox value={item.id} className="sidebar__categories--item" key={item.id}>
        <div className="sidebar__categories--item-content">
          <span>{t(`${item.name}`)}</span>
          <span>({item.totalProducts})</span>
        </div>
      </Checkbox>
    ));
  };

  const renderFilterPrice = () => {
    return arrPrice.map((item, index) => (
      <Checkbox value={index + 1} className="sidebar__price--item" key={index}>
        {item}
      </Checkbox>
    ));
  };

  const renderFilterTag = () => {
    return sidebarData?.tagsData?.map((item) => (
      <span
        className={`sidebar__tags--item ${
          filterProducts.tag === item.id ? 'sidebar__tags--item-active' : ''
        }`}
        key={item.id}
        onClick={() => handelClickTag(item)}
      >
        {t(`${item.name}`)}
      </span>
    ));
  };

  return (
    <article className="sidebar">
      <div className="sidebar__container">
        {isFilter && (
          <section className="sidebar__filter">
            <div className="sidebar__filter--title">
              <h2>Filter:</h2>
              <button className="button" onClick={handelClearFilter}>
                Clear All
              </button>
            </div>
            <div className="sidebar__filter--content">
              {arrFilter.category &&
                arrFilter.category.map((item, index) => (
                  <span className="sidebar__filter--item" key={index}>
                    {item}
                    <RiCloseLine />
                  </span>
                ))}
              {arrFilter.price &&
                arrFilter.price.map((item, index) => (
                  <span className="sidebar__filter--item" key={index}>
                    {item}
                    <RiCloseLine />
                  </span>
                ))}
              {arrFilter.tag &&
                arrFilter.tag.map((item, index) => (
                  <span className="sidebar__filter--item" key={index}>
                    {item}
                    <RiCloseLine />
                  </span>
                ))}
            </div>
          </section>
        )}
        <section className="sidebar__categories">
          <Menu defaultOpenKeys={[`${width > 768 ? 'sub1' : 'sub2'}`]} mode="inline">
            <SubMenu
              key="sub1"
              title={<h2 className="sidebar__title">{t('products.Categories')}</h2>}
            >
              <Menu.ItemGroup key="g1">
                <Checkbox.Group value={filterProducts.category} onChange={handelChangeCategory}>
                  {renderFilterCategory()}
                </Checkbox.Group>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>
        </section>
        <section className="sidebar__price">
          <Menu defaultOpenKeys={[`${width > 768 ? 'sub2' : ''}`]} mode="inline">
            <SubMenu
              key="sub2"
              title={<h2 className="sidebar__title">{t('products.Filter by Price')}</h2>}
            >
              <Menu.ItemGroup key="g1">
                <Checkbox.Group onChange={handelChangePrice} value={priceValue}>
                  {renderFilterPrice()}
                </Checkbox.Group>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>
        </section>
        <section className="sidebar__tags">
          <Menu defaultOpenKeys={[`${width > 768 ? 'sub3' : ''}`]} mode="inline">
            <SubMenu
              key="sub3"
              title={<h2 className="sidebar__title">{t('products.Filter by Tags')}</h2>}
            >
              <Menu.ItemGroup key="g1">
                <div className="sidebar__tags--content">{renderFilterTag()}</div>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>
        </section>
        <section className="sidebar__banner">
          <img
            src="https://images.unsplash.com/photo-1609842947419-ba4f04d5d60f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="sidebar__banner--img"
          ></img>
        </section>
      </div>
    </article>
  );
};

const mapStateToProps = (state) => {
  const { sidebarData } = state.categoryReducer;
  return {
    sidebarData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSidebar: (params) => dispatch(getSidebar(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
