import React from 'react';
import { Router, Switch } from 'react-router-dom';
import history from './util/history';

import 'antd/dist/antd.css';
import './scss/styles.scss';

import Home from './pages/User/Home';
import DefaultLayout from './layouts/DefaultLayout';
import PrivateLayout from './layouts/PrivateLayout';
import PaymentLayout from './layouts/PaymentLayout';

import ProductDetail from './pages/User/ProductDetail';
import Login from './pages/User/Login';
import Register from './pages/User/Register';
import Products from './pages/User/Products';
import Cart from './pages/User/Cart';
import Information from './pages/User/Payment/Information';
import Profile from './pages/User/Profile';
import Shipping from './pages/User/Payment/Shipping';
import Payment from './pages/User/Payment/Payment';
import Success from './pages/User/Success';

import ListUser from './pages/Admin/ListUser';
import Dashboard from './pages/Admin/Dashboard';
import ProductsAdmin from './pages/Admin/ProductsAdmin';
import AddProductAdmin from './pages/Admin/ProductsAdmin/AddProduct';
import ListOrder from './pages/Admin/ListOrder';
import OrderDetail from './pages/Admin/ListOrder/OrderDetail/OrderDetail';
import NotFound from './components/NotFound/NotFound';
import About from './pages/User/About/index';
import ListComment from './pages/Admin/ListComment';
import DiscountManagement from './pages/Admin/DiscountManagement';
import CreateDiscount from './pages/Admin/DiscountManagement/CreateDiscount';
import Contact from './pages/User/Contact/Contact';
import ListContact from './pages/Admin/ListContact/ListContact';
import Discount from './pages/User/Discount';
import CategoryCreate from './pages/Admin/Category/CategoryCreate';
import CategoryIndex from './pages/Admin/Category/CategoryIndex';
import TagCreate from './pages/Admin/Tag/TagCreate';
import TagIndex from './pages/Admin/Tag/TagIndex';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          {/* USER */}
          <DefaultLayout exact path="/" component={Home} />
          <DefaultLayout exact path="/products" component={Products} />
          <DefaultLayout exact path="/cart" component={Cart} />
          <DefaultLayout exact path="/login" component={Login} />
          <DefaultLayout exact path="/register" component={Register} />
          <DefaultLayout exact path="/product/:id" component={ProductDetail} />
          <DefaultLayout exact path="/profile" component={Profile} />
          <DefaultLayout exact path="/success/:id" component={Success} />
          <DefaultLayout exact path="/notfound" component={NotFound} />
          <DefaultLayout exact path="/about" component={About} />
          <DefaultLayout exact path="/contact" component={Contact} />
          <DefaultLayout exact path="/discount" component={Discount} />

          <PaymentLayout exact path="/infoPayment" component={Information} />
          <PaymentLayout exact path="/shipping" component={Shipping} />
          <PaymentLayout exact path="/payment" component={Payment} />

          {/* ADMIN */}
          <PrivateLayout exact path="/admin" component={Dashboard} />
          <PrivateLayout exact path="/admin/listUser" component={ListUser} />
          <PrivateLayout exact path="/admin/listOrder" component={ListOrder} />
          <PrivateLayout exact path="/admin/listOrder/:id" component={OrderDetail} />
          <PrivateLayout exact path="/admin/listComment" component={ListComment} />
          <PrivateLayout exact path="/admin/products" component={ProductsAdmin}></PrivateLayout>
          <PrivateLayout exact path="/admin/listContact" component={ListContact}></PrivateLayout>
          <PrivateLayout
            exact
            path="/admin/products/add"
            component={AddProductAdmin}
          ></PrivateLayout>
          <PrivateLayout
            exact
            path="/admin/products/edit/:id"
            component={AddProductAdmin}
          ></PrivateLayout>
          <PrivateLayout
            exact
            path="/admin/discount"
            component={DiscountManagement}
          ></PrivateLayout>
          <PrivateLayout exact path="/admin/discount" component={CreateDiscount}></PrivateLayout>
          <PrivateLayout
            exact
            path="/admin/discount/add"
            component={CreateDiscount}
          ></PrivateLayout>

          <PrivateLayout
            exact
            path="/admin/category/add"
            component={CategoryCreate}
          ></PrivateLayout>
          <PrivateLayout
            exact
            path="/admin/category/edit/:id"
            component={CategoryCreate}
          ></PrivateLayout>
          <PrivateLayout exact path="/admin/category" component={CategoryIndex}></PrivateLayout>
          <PrivateLayout exact path="/admin/tag/add" component={TagCreate}></PrivateLayout>
          <PrivateLayout exact path="/admin/tag" component={TagIndex}></PrivateLayout>
          <PrivateLayout exact path="/admin/tag/edit/:id" component={TagCreate}></PrivateLayout>

          <PrivateLayout exact path="*" component={Home}></PrivateLayout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
