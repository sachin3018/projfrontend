import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import Base from '../core/Base';
import  { createProduct, getAllCategories } from '../admin/helper/adminapicall'
import { isAuthenticated } from '../auth/helper';


 const AddProduct = () => {

    const { user, token } = isAuthenticated();

    const [values, setvalues] = useState({
        name : "",
        description : "",
        price: "",
        stock : "",
        photo : "",
        categories : [],
        category : "",
        loading : false,
        error : "",
        createdProduct : "",
        getRedirect : false,
        formData : ""
    });
   
    const {name, description, price, stock, photo, categories, category, loading, error, createdProduct, getRedirect, formData} = values;

    useEffect(() => {
        preload();
    }, [])

    const preload = () => {
       
        getAllCategories()
        .then(data => {
            console.log(data);
            if (data.error) {
                setvalues({...values, error : data.error})
            }
            else{
                setvalues({...values , categories : data, formData : new FormData()})
                console.log("CAT : ", categories);
            }
        })
        .catch(error => {
            console.log(error)
        })

    }

    const createProductForm = () => (
        <form className="mb-4 mt-4">
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {
              categories &&
              categories.map((name,index) => (
                <option key={index} value={name._id}>{name.name}</option>
                ))
              }
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success">
            Create Product
          </button>
        </form>
      );

    const onSubmit = (event) => {
     
       event.preventDefault();
       setvalues({...values,error : "", loading : true})
       createProduct(user._id, token,formData)
       .then(data => {
        console.log("submit pressed");
         if(data.error){
           setvalues({...values, error : data.error});
           //console.log(formData);
         }
         else{
         
           setvalues({
             ...values,
             name : "",
             description : "",
             price : "",
             stock : "",
             photo : "",
             loading : false,
             getRedirect : true,
             createdProduct : data.name
           })
           
         }
       })
       .catch(error => {
         console.log(error)
       })
    }
    // const redirect = () => {
    //   if(getRedirect){
    //     setTimeout(
    //      doredirect()
    //     ,1000);
    //   }
    // }

    // const doredirect = () => {
    //   return <Redirect to="/user/admin/dashboard"/>
    // }
    const handleChange = (name) => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setvalues({...values, [name] : value})

    }


    const successMessage = () => (
      <div className="mt-3 alert alert-success"
      style={{display : createdProduct ? "": "none"}}>
        <h4>{createdProduct} created succesfully</h4>
      </div>
    )

    const failMessage = () => (
      <div className="mt-3 alert alert-danger"
      style={{display : error ? "" : "none"}}>
        <h4>Failed to create {error}</h4>
      </div>
    )
    return (
        <Base
        title="Add Product"
        description="Welcome to product creation section !"
        className="container bg-info p-4">
            <Link to="/user/admin/dashboard" className="btn btn-md btn-dark mb-4">
                Admin Home
            </Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {failMessage()}
                    {/* {redirect()} */}
                   {createProductForm()}
                </div>
            </div>
        </Base>
    )
}

export default AddProduct;