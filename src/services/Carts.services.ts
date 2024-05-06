import { Cart } from "../components/TableCarts"

export const deleteCart = async (id: number) => {
    const res = await fetch(`https://fakestoreapi.com/carts/${id}`, {
        method: "DELETE"
    })
    const json = await res.json()
    return (json)
}

 export const updateCart = (id: number, updatedCart: Cart) => {
    fetch(`https://fakestoreapi.com/carts/${id}`,{
        method:"PUT",
        body:JSON.stringify(
            {
                ...updatedCart
            }
        )
    })
        .then(res=>res.json())
        .then(json=>console.log(json))
}

