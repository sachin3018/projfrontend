const { API } = require("../../backend");


//category calls

export const createCategory = (userId, token, category) =>{

    return fetch(`${API}//category/create/${userId}`,{
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(category)
    })
    .then(response => {
        return response.json()
    })
    .catch(error => {console.log(error)})
}

//get all categories
export const getAllCategories = () => {
    return fetch(`${API}/categories`,{
        method : "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(error => console.log(error))

}

//product calls
export const createProduct = (userId, token ,product) => {
    return fetch(`${API}/product/create/${userId}`,{
        method : "POST",
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : product
    })
    .then(response => {
        return response.json()
    })
    .catch(error => {
        console.log(error)
    })
}

//get all products
export const getallProducts = () => {
    return fetch(`${API}/products`,{
        method : "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(error => console.log(error))

}

//get a product
export const getProduct = (productId) => {
    return fetch(`${API}//product/${productId}`,{
        method : "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(error => console.log(error))
}

//update product
export const updateProduct = (userId,productId,token,product) => {
    return fetch(`${API}/product/update/${productId}/${userId}`,{
        method : "PUT",
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : product
    })
    .then(response => {
        return response.json();
    })
    .catch(error => console.log(error))
}

//delete product
export const deleteProduct = (productId,userId,token) => {
    return fetch(`${API}/product/delete/${productId}/${userId}`,{
        method : "DELETE",
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(error => console.log(error))
}
