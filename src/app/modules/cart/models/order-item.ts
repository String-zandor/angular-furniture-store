import { CartItem } from "./cart-item"

export interface OrderItem {
    id?:number
    status:string
    cart:CartItem[]
}
