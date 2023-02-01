import { Product } from "../../product/models/product";

export interface CartItem {
    id?: number,
    userId?: number, 
    product: Product,
    qty: number,
    checkout?: boolean
}
