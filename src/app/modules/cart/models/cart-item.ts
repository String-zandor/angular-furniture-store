import { Product } from "../../product/models/product";

export interface CartItem {
    id?: number,
    product: Product,
    qty: number
}
