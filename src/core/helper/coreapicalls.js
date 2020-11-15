const { API } = require("../../backend");

export const getAllProductsToDisplay = () => {
    return fetch(`${API}/products`, {
        method : 'GET',
    })
    .then(data => {
        if(data.error){
            console.log(data.error);
        }else{
            return data.json();
        }
    })
    .catch(error => {
        console.log(error)
    })
}
