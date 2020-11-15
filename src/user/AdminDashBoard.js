import React from 'react'
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper/index'
import { Link } from 'react-router-dom';

const AdminDashBoard = () => {

    const { user : { email, name, role }  } = isAuthenticated();

    const leftSide = () => {
       return(
          <span>
               <div className="card">
                    <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <Link 
                                className="nav-link text-success "
                                to = "/admin/create/catrgories">
                                    Create Categories
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link 
                                className="nav-link text-success "
                                to = "/admin/catrgories">
                                    Manage Categories
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link 
                                className="nav-link text-success "
                                to="/admin/create/products">
                                    Add Products
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link 
                                className="nav-link text-success "
                                to="/admin/products">
                                    Manage Products
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link 
                                className="nav-link text-success"
                                to="/admin/orders">
                                    Manage Orders
                            </Link>
                        </li>
                    </ul>
               </div>
          </span>
       )
    }
    
    const rightSide = () => {
        return(
            <div className="card mb-4">
                <h4 className="card-header">Hello Admin</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span style={{fontSize : 20}} className="badge badge-success mr-2">Name : </span>{name}
                    </li>
                    <li className="list-group-item">
                        <span style={{fontSize : 20}} className="badge badge-success mr-2">Email : </span>{email}
                    </li>

                    <li className="list-group-item">
                        <span style={{fontSize : 20}} className="badge badge-danger">Admin Access</span>
                    </li>
                </ul>
            </div>
        )
    }


    return (
        <Base title="Welcome to Admin Area"
            description="Here You can Manage your all products"
            className="container bg-success p-4">
          <div className="row">
            <div className="col-3">
                {leftSide()}
            </div>
            <div className="col-9">
                {rightSide()}
            </div>
         </div>  
        </Base>
    )
}

export default AdminDashBoard;