import React, {useState} from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom'
import { signup } from '../auth/helper';
const Signup = () => {
    //Hooks for state managment 
    const [values, setValues] = useState({
        name : "",
        email : "",
        password : "",
        error : "",
        success : false
    });
    //de-structuring the data for easy use.
    const { name,email,password,error,success } = values;


    const handleChange = name => event => {
        setValues({...values, error : false, [name] : event.target.value});
    };

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values,error : false});
        signup({name,email,password})
        .then(data => {
            if (data.error) {
                setValues({...values, error : data.error, success : false});
            }else{
                setValues({
                    ...values,
                    name : "",
                    email : "",
                    password : "",
                    error : "",
                    success : true
                })
            }
        })
        .catch(error => console.log("Error in signup"));
    }
    

    const signupform = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">
                                Name :
                            </label>
                            <input 
                                value={name} 
                                className="form-control" 
                                onChange={handleChange("name")} 
                                type="text"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">
                                Email :
                            </label>
                            <input 
                                value={email} 
                                className="form-control" 
                                onChange={handleChange("email")} 
                                type="text"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">
                                Password :
                            </label>
                            <input  
                                value={password} 
                                className="form-control" 
                                onChange={handleChange("password")} 
                                type="password"/>
                        </div>
                        <button onClick={onSubmit} style={{borderRadius : 15}} className="btn btn-success btn-block">Submit</button>
                    </form>

                </div>
            </div>
        )
    }

    const onSuccess = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div 
                        className="alert alert-success" 
                        style={{display : success ? "": "none"}}>
                            New Account is Created . Please 
                            <Link to="/signin">Login Here</Link>
                    </div>
                </div>
             </div>
        )
    }

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

    return(
        <Base title="Hey! You Can SignUp...." description="You Can SignUp by filling below details">
            {onSuccess()}
            {onError()}
            {signupform()}
            {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </Base>
    );
}

export default Signup;