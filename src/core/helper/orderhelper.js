import { API } from '../../backend';


export const createOrder = (userId, token, orderData) => {
    return fetch(`${API}/order/createOrder/${userId}`,{
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify({order : orderData})
    })
    .then(response => {
        return response.json()
    })
    .catch(error => {
        console.log(error)
    })
}