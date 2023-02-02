import { Product } from "./product";

export interface OrderItem {
    product?: Product,
    totalBuys: number
}
