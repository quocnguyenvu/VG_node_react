import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setValueSearch } from '../../redux/actions';
import './styles.scss';

function NotFound({ valueSearch }) {
  const { t, i18n } = useTranslation();
  return <h1 className="notfound__title">{`${t('notFound')} '${valueSearch}'`}</h1>;
}

// export default NotFound;

const mapStateToProps = (state) => {
  const { valueSearch } = state.productReducer;
  return {
    valueSearch,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValueSearch: (params) => dispatch(setValueSearch(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
