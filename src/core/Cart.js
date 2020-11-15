import React, { useState, useEffect } from 'react'
import "../styles.css"
import Base from './Base'
import Card from './Card'
import Payment from './Payment'
import { loadCart } from './helper/carthelper'

const  Cart = ()  => {
    const [products, setproducts] = useState([]);
    const [reload, setreload] = useState(false);

    
    const loadAllProduct = () => {
        return(
            <div>
                <h2 className="mb-4">This section is to load product</h2>
                {
                    products.map((product, index) => (
                        <div>
                            <Card 
                            key={index}
                            product={product}
                            removeFromCard = {true}
                            addToCart = {false}
                            setreload={setreload}
                            reload={reload}
                            />
                            <div className="mt-3">
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
    
    const loadCheckOut = () => {
        return(
            <div>
                <Payment 
                 product={products}
                 setreload={setreload}
                 reload={reload}
                />
            </div>
        )
    }

   


    useEffect(() => {
        setproducts(loadCart())
    }, [reload])

    return (
        <Base title="Cart Page" description="Just about to Book Your Product">
            <div className="row text-center">
                <div className="col-6">
                    {products !== undefined  ? loadAllProduct(): (<h3>Sorry! the cart is empty</h3>)}
                </div>
                <div className="col-6">
                    {loadCheckOut()}
                </div>
            </div>
        </Base>
    )
}

export default Cart;
