import { API } from '../../backend';


export const getMeToken = (userId, token) => {
    return fetch(`${API}/payment/token/${userId}`, {
        method : "GET",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(error => console.log(error))
}


export const processPayment = (userId, token, paymentInfo) => {
    return fetch(`${API}/payment/brainTree/${userId}`, {
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(paymentInfo)
    })
    .then(response => {
        return response.json();
    })
    .catch(error => console.log(error))
}