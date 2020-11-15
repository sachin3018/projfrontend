import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import Base from '../core/Base';
import  { getProduct, updateProduct ,  getAllCategories } from '../admin/helper/adminapicall'
import { isAuthenticated } from '../auth/helper';


 const UpdateProduct = ({match}) => {

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

    const { productId } = useParams();

    useEffect(() => {
        
        preload(match.params.productId);
    }, [])

    const preload = (productId) => {
       
        getProduct(productId)
        .then(data => {
            //console.log(data);
            if (data.error) {
                setvalues({...values, error : data.error})
            }
            else{
              console.log(data.category.name);
              preloadCategories();
               setvalues({
                   ...values,
                   name : data.name,
                   description : data.description,
                   price : data.price,
                   stock : data.stock,
                   category : data.category._id,
                   formData : new FormData(),
                   error : "",
                   loading : false
               })
              
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
              <option>Select Option</option>
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
            Update Product
          </button>
        </form>
      );

    const onSubmit = (event) => {
     
       event.preventDefault();
       setvalues({...values,error : "", loading : true})
       
       updateProduct(user._id,match.params.productId, token,formData)
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

    const preloadCategories = () => {
        getAllCategories().then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                console.log(data);
                setvalues({
                    categories : data,
                    formData : new FormData()
                })
            }
        })
        .catch(error => console.log(error))
    }

    const handleChange = (name) => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setvalues({...values, [name] : value})

    }


    const successMessage = () => (
      <div className="mt-3 alert alert-success"
      style={{display : createdProduct ? "": "none"}}>
        <h4>{createdProduct} updated succesfully</h4>
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
                   {createProductForm()}
                </div>
            </div>
        </Base>
    )
}

export default UpdateProduct;