import { fork } from 'redux-saga/effects';
import { all } from 'redux-saga/effects';
import productSaga from './product.saga';
import categorySaga from './category.saga';
import productDetailSaga from './productDetail.saga';
import accountSaga from './account.saga';
import cartSaga from './cart.saga';
import tagSaga from './tag.saga';
import paymentSaga from './payment.saga';
import discountSaga from './discount.saga';
import contactSaga from './contact.saga';
import dashboardSaga from './dashboard.saga';
import tagDetailSaga from './tagDetail.saga';
import categoryDetailSaga from './categoryDetail.saga';

export default function* mySaga() {
  yield all([
    fork(productSaga),
    fork(categorySaga),
    fork(categoryDetailSaga),
    fork(tagSaga),
    fork(tagDetailSaga),
    fork(accountSaga),
    fork(productDetailSaga),
    fork(cartSaga),
    fork(paymentSaga),
    fork(discountSaga),
    fork(contactSaga),
    fork(dashboardSaga),
  ]);
}
