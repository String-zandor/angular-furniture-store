import { CartItem } from "../../cart/models/cart-item";

export interface Order {
    user: number,
    id?: number,
    status: string,
    subtotal: number,
    deliveryfee: number,
    total : number,
    orderDate: string,
    shipping: { 
        name: string,
        phone: string,
        address: string
     },
    cart: CartItem[]
}
