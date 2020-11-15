export const addItemToCart = (item,next) => {
    var cart = [];
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
             cart = JSON.parse(localStorage.getItem("cart"));
        }
        cart.push({
            ...item,
            count : 1
        })
        localStorage.setItem("cart",JSON.stringify(cart));
        next();
    }
}


export const loadCart = () => {
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
}


export const removeFromCart = (productId) => {
    let cart = [];
    if (typeof window !== undefined) {
        if(localStorage.getItem("cart")){
            cart =  JSON.parse(localStorage.getItem("cart"));
        }
        let done = 0;
        cart.map((product,index) => {
            if(product._id === productId && done === 0){
                cart.splice(index,1);
                done = 1;
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    return cart;
   
}

export const emptyCart = next => {
    if(typeof window !== undefined){
        localStorage.removeItem("cart");
        let cart = [];
        localStorage.setItem("cart", JSON.stringify(cart))
        next();
    }
}