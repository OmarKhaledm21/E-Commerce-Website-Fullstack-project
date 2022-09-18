
export const addItemToCart = (item, next) => {
    let cart = [];
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.push({
            ...item
        });

        localStorage.setItem("cart", JSON.stringify(cart));

        next();
    }
}

export const loadCart = () => {
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
}

export const removeItemFromCart = productId => {
    let cart = [];
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        cart.map((product, i) => {
            if (product.id === productId) {
                cart.splice(i, 1);
            }
        })
        //cart = cart.filter((product) => { return product.id !== productId });
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
}

export const cartEmpty = (next) => {
    if (typeof window !== undefined) {
        localStorage.removeItem("cart");
        let cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        next();
    }
}