import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteProduct, getallProducts } from './helper/adminapicall';

const  ManageProducts = () => {

    const [product, setproduct] = useState([]);

    const { user, token } = isAuthenticated();

    const preload = () => {
        getallProducts()
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setproduct(data) //they are not objects we can store them directly we can also load previous values.
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        preload();
    }, [])


    const deleteSpecificProduct = productId => {
        deleteProduct(productId, user._id, token)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                preload();
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
    return (
        <Base title="Welcome admin" description="Manage products here">
            <Link className="btn btn-info mb-4" to="/user/admin/dashboard">
                <span className="">Admin Home</span>
            </Link>
            <h2 className="mb-4">All products:</h2>
            <div className="row">
                <div className="col-12">
                <h2 className="text-center text-white my-3 mb-3">Total 3 products</h2>
                {
                    product.map((porductName, index) => {
                        return(
                                <div className="row text-center mb-2 ">
                                    <div className="col-4">
                                    <h3 className="text-white text-left">{porductName.name}</h3>
                                    </div>
                                    <div className="col-4">
                                    <Link
                                        className="btn btn-success"
                                        to={`/admin/product/update/${porductName._id}`}
                                    >
                                        <span className="">Update</span>
                                    </Link>
                                    </div>
                                    <div className="col-4">
                                    <button onClick={() => (
                                         deleteSpecificProduct(porductName._id)
                                    )} className="btn btn-danger">
                                        Delete
                                    </button>
                                    </div>
                                </div>
                        )
                    })
                }
                
                </div>
            </div>
    </Base>
    )
}

export default ManageProducts;

