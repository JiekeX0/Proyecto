import { Product } from "../TableProducts";

export function addProductQuery( product: Product){
    return fetch('https://fakestoreapi.com/products',{
        method:"POST",
        body:JSON.stringify(
            {
                title: product.title,
                price: product.price,
                description: product.description,
                image: product.image,
                category: product.category
            }
        )
    })
    .then(res=>res.json())
    .then((json)=>{
        const data = {...json, ...product}
        return data
    })
}
