import React,{ useState }from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createCategory } from './helper/adminapicall';

const AddCategory = () => {

    const [name, setname] = useState("");
    const [error, seterror] = useState(false);
    const [success, setsuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const handleChange = (event) => {
        seterror("");
        setname(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        seterror("")
        setsuccess(false)

        //fireing backend call
        createCategory(user._id, token, {name})
        .then(data => {
            if(data.error){
                seterror(true);
            }else{
                seterror(false);
                setsuccess(true);
                setname("");
            }
        })
        .catch(error => {
            console.log(error);
        })
    }


    const successMessage = () => {
        if(success){
            return(
                <h4 className="text-success">Category Added Successfullt</h4>
            )
        }
    }

    const errorMessage = () => {
        if(error){
            return(
                <h4 className="text-danger">Failed to Add Category</h4>
            )
        }
    }

    const categoryForm = () => {
        return(
            <form>
                <div className="form-group">
                    <p className="lead">Enter the category : </p>
                    <input 
                    type="text"
                    onChange={handleChange}
                    value={name}
                    className="form-control my-3"
                    autoFocus
                    required
                    placeholder="For Ex. Pictures"/>
                    <button onClick={onSubmit} className="btn btn-outline-info">Add Category</button>
                </div>
            </form>
        )
    }

    const goBack = () => {
        return(
            <div className="mt-5">
                <Link className="btn btn-sm btn-success mb-3" to="/user/admin/dashboard">Go To DashBoard</Link>
            </div>
        )
    }

    return (
        <Base
            title="Crete Category Here"
            description="Add your category for product"
            className="container p-4 bg-info">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {errorMessage()}
                    {categoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory;