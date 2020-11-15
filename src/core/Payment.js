import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { loadCart, emptyCart } from './helper/carthelper';
import { createOrder } from './helper/orderhelper';
import { getMeToken, processPayment } from './helper/paymenthelper';
import DropIn from "braintree-web-drop-in-react"


const Payment = ({ product, setreload = f => f, reload = undefined }) => {

    const [info, setinfo] = useState({
        loading : false,
        success : false,
        clientToken : null,
        error : "",
        instance : {}
    })

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId,token) => {
        getMeToken(userId, token)
        .then(info => {
            console.log(info);
            if(info.error){
                setinfo({...info, error : info.error})
            }else{
                let clientToken = info.clientToken;
                setinfo({clientToken})
            }
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
       getToken(userId, token)
    }, [])

    const onBuy = () => {
        setinfo({loading : true})
        let nonce;
        let getnonce = info.instance
            .requestPaymentMethod()
            .then(data => {
                nonce = data.nonce;
                
                // createOrder({
                //     product : product,
                //     transaction_id : response.transaction.id,
                //     amount : response.transaction.amount
                // })
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount : getAmount()
                }
                processPayment(userId, token, paymentData)
                .then(response => {
                    
                    setinfo({...info, loading : false, success : response.success})
                    //console.log(response);
                    const orderData = {
                        products : product,
                        transaction_id : response.transaction.id,
                        amount : response.transaction.amount
                    }
                    createOrder(userId,token,orderData);
                     console.log(orderData);
                    //TODO make cart empty
                    emptyCart(() => {
                        console.log("ordered succesfully")
                    })
                    //TODO force reload
                    setreload(!reload);
                })
                .catch(error => {
                    setinfo({...info,loading : false, success : false})
                    console.log("Payment Failed")
                })
            })

    }

    const getAmount = () => {
        let amount = 0;
        product.map(p => {
            amount = amount + p.price;
        })
        return amount;
    }

    const showbtdropIn = () => {
        return (
            <div>
              {info.clientToken !== null && product !== undefined ? (
                <div>
                  <h3>Total Bill : Rs {getAmount()} </h3> 
                  <DropIn
                    options={{ authorization: info.clientToken }}
                    onInstance={instance => (info.instance = instance)}
                  ></DropIn>
                  <button className="btn btn-block btn-success" onClick={() => {onBuy()}}>
                    Buy
                  </button>
                </div>
              ) : (
                <h3>Please login or add something to cart</h3>
              )}
            </div>
          );
      };

    return (
        <div>
           
           {showbtdropIn()}
        </div>
    )
}

export default Payment;