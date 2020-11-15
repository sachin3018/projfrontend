import React,{ useState } from 'react'
import Base from '../core/Base'
import { Link, Redirect } from 'react-router-dom'
import { signin, authenticate, isAuthenticated } from '../auth/helper/index'

const Signin = () => {
//managed the state
    const [values,setValues] = useState({
        email : "",
        password : "",
        error : "",
        loading : false,
        isRedirected : false
    });
//de-structured the stage
    const { email,password,error,loading,isRedirected } = values;

//this function returning the whole data stored in jwt
    const { user } = isAuthenticated();
   

    const handleChange = name => event => {
        setValues({...values, error : false, [name] : event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error : false, loading : true})
        signin({email,password})
        .then(data => {
            if (data.error) {
                setValues({...values, error : data.error, loading : false})
            }else{
                authenticate(data,() => {
                    setValues({
                        ...values,
                        isRedirected : true,
                        email : "",
                        password : "",
                        error : ""
                    });
                });
            }
        })
        .catch(error => console.log("SingIn Request Failed"))
    }

    const performRedirect = () => {
        
        if(isRedirected){
            if (user && user.role === 1) {
                return <Redirect to="/user/admin/dashboard"/>
            }else{
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    }

    const onLoading = () => {
        return(
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        )
    };

    const onError = () => {
       return(
        <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
             <div
                className="alert alert-danger"
                style={{display : error ? "" : "none"}}>
                    {error}
            </div>
        </div>
        </div>
       )
    }

    const signinform = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">
                                Email :
                            </label>
                            <input 
                                value={email} 
                                onChange={handleChange("email")} 
                                className="form-control" 
                                type="text"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">
                                Password :
                            </label>
                            <input 
                                value={password} 
                                onChange={handleChange("password")} 
                                className="form-control"
                                type="password"/>
                        </div>
                        <div className="form-group">
                            <button 
                                onClick={onSubmit} 
                                style={{borderRadius : 15}} 
                                className="btn btn-success btn-block">Submit</button>
                        </div>
                    </form>

                </div>
            </div>
        )
    }

    return(
        <Base title=" SignIn page " description="Hey! Welcome Back You can Login and continue your shopping..">
            {onLoading()}
            {onError()}
            {signinform()}
            {performRedirect()}
            {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </Base>
    )
}

export default Signin;