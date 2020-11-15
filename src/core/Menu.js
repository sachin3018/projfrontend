import React, {Fragment} from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth/helper'


const currentTab = (history, path) => {
    if(history.location.pathname === path){
        return {color : "#2ecc72"}
    }else{
        return {color : "#d1d1d1"}
    }
}

const Menu = ({history}) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link 
                        style = {currentTab(history,"/")}
                        className="nav-link" 
                        to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link 
                        style = {currentTab(history,"/user/card")}
                        className="nav-link" 
                        to="/user/cart">Cart</Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                    <Link 
                        style = {currentTab(history, "/user/dashboard")}
                        className="nav-link" 
                        to="/user/dashboard">DashBoard</Link>
                    </li>
                )}
                { isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                    <Link 
                        style={currentTab(history, "/user/admin/dashboard")} 
                        className="nav-link" 
                        to="/user/admin/dashboard">Admin DashBoard</Link>
                    </li>
                )}
                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link 
                                style={currentTab(history, "/signup")} 
                                className="nav-link" 
                                to="/signup">Sign Up</Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                style={currentTab(history, "/signin")} 
                                className="nav-link" 
                                to="/signin">Sign In</Link>
                        </li>
                     </Fragment>
                )}
                {isAuthenticated() && (
                    <li className="nav-item">
                       <Link className="nav-link">
                       <span
                            className="text-danger"
                            onClick = {() => {
                                signout(() => {
                                    history.push("/");
                                })
                            }}>
                            Signout
                        </span>
                       </Link>
                    </li>
                ) }
            </ul>
        </div>
    )
}

export default withRouter(Menu);