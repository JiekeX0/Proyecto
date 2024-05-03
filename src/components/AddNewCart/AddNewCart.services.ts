import { Cart } from "../TableCarts";

export function addCartQuery(cart: Cart) {
    return fetch('https://fakestoreapi.com/carts', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cart)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to add cart');
        }
        return res.json();
    })
    .then(json => {
        const data = { ...json, ...cart };
        return data;
    });
}
