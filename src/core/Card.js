import React, { useState, useEffect } from 'react'
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom'
import { addItemToCart, removeFromCart } from './helper/carthelper'
    const Card = ({
        product,
        addToCart = true,
        removeFromCard = false,
        setreload = f => f,
        reload = false
    }) => {

        const [redirect, setredirect] = useState(false);
        const [count, setcount] = useState(product.count)

        const title = product ? product.name : "Product Name";
        const description = product ? product.description : "Product Description";
        const price = product ? product.price : "DEFAULT"

        const addtoCart = () => {
          addItemToCart(product, () => setredirect(true));
        }

        const getRedirect = () => {
          if(redirect){
            return <Redirect to="/user/cart"/>
          }
        }

        const showAddToCart = () => {
            return(
                addToCart &&
                (
                    <button
                    onClick={addtoCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                  >
                    Add to Cart
                  </button>
                )
            )
        }

        const showRemoveFromCart = () => {
            return(
                removeFromCard &&
                (
                    <button
                    onClick={() =>  {
                      removeFromCart(product._id)
                      setreload(!reload)
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                  >
                    Remove from cart
                  </button>
                )
            )
        }
        return (
          <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{title}</div>
            {getRedirect()}
            <div className="card-body">
              <ImageHelper product={product}/>
              <p className="lead bg-success font-weight-normal text-wrap">
                {description}
              </p>
                <p className="btn btn-success rounded  btn-sm px-4">{price}</p>
              <div className="row">
                <div className="col-12">
                  {showAddToCart()}
                </div>
                <div className="col-12">
                  {showRemoveFromCart()}
                </div>
              </div>
            </div>
          </div>
        );
      };



    export default Card;
