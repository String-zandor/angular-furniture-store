import { CartItem } from "../../cart/models/cart-item";

export interface Order {
    user: number,
    id?: number,
    status: string,
    subtotal: number,
    deliveryfee: number,
    total : number,
    orderDate: string,
    cart: CartItem[]
}
