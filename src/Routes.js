import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import AdminRoutes from './auth/helper/AdminRoutes'
import PrivateRoute from './auth/helper/PrivateRoutes'
import UserDashBoard from './user/UserDashBoard'
import Profile from './user/Profile'
import AdminDashBoard from './user/AdminDashBoard'
import AddCategory from './admin/AddCategory'
import ManageCategories from './admin/ManageCategories'
import ManageProducts from './admin/ManageProducts'
import AddProduct from './admin/AddProduct'
import UpdateProduct from './admin/UpdateProduct'
import Cart from './core/Cart'


export default function Routes() {
    return (
       <BrowserRouter>
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/signup" component={Signup} exact />
            <Route path="/signin" component={Signin} exact />
            <PrivateRoute path="/user/profile" component={Profile} exact/>
            <PrivateRoute path="/user/dashboard" component={UserDashBoard} exact/>
            <PrivateRoute path="/user/cart" component={Cart} exact/>
            <AdminRoutes path="/user/admin/dashboard" component={AdminDashBoard} exact/>
            <AdminRoutes path="/admin/create/catrgories" component={AddCategory} exact/>
            <AdminRoutes path="/admin/catrgories" component={ManageCategories} exact/>
            <AdminRoutes path="/admin/products" component={ManageProducts} exact/>
            <AdminRoutes path="/admin/create/products" component={AddProduct} exact/>
            <AdminRoutes path="/admin/product/update/:productId" component={UpdateProduct} exact/>

        </Switch>
       </BrowserRouter>
    )
}

//TODO may be route should be exported