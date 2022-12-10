import { combineReducers } from 'redux';
import accountReducer from './account.reducer';
import productDetailReducer from './productDetail.reducer';
import productReducer from './product.reducer';
import categoryReducer from './category.reducer';
import tagReducer from './tag.reducer';
import tagDetailReducer from './tagDetail.reducer';
import cartReducer from './cart.reducer';
import paymentReducer from './payment.reducer';
import discountReducer from './discount.reducer';
import contactReducer from './contact.reducer';
import dashboardReducer from './dashboard.reducer';
import categoryDetailReducer from './categoryDetail.reducer';

export default combineReducers({
  productReducer,
  tagReducer,
  tagDetailReducer,
  categoryReducer,
  categoryDetailReducer,
  accountReducer,
  productDetailReducer,
  cartReducer,
  paymentReducer,
  discountReducer,
  contactReducer,
  dashboardReducer,
});
