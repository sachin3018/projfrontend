import React, { useState, useEffect } from 'react'
import "../styles.css"
import Base from './Base'
import Card from './Card'
import { getAllProductsToDisplay } from './helper/coreapicalls'


export default function Home() {
    const [products, setproducts] = useState([])
    const [error, seterror] = useState(false)

    const laodAllProducts = () => (
        getAllProductsToDisplay().then(data => {
            if(data.error){
                seterror(data.error);
            }else{
                setproducts(data)
            }
        })
    )

    useEffect(() => {
        laodAllProducts();
    }, [])
    return (
        <Base title="Home Page" description="Welcome! Look for your T-Shirt">
            <div className="row text-center">
                <div className="row">
                    {
                        products.map((product,index) => {
                            return(
                                <div key={index} className="col-4 mb-4">
                                    <Card product={product}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Base>
    )
}
