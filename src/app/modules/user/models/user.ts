import { CartItem } from "../../cart/models/cart-item";

export interface User {
    id?: number,
    firstName: string,
    lastName: string,
    phone: string,
    address: string,
    email: string,
    birthDate: string,
    username: string,
    password: string,
    active: boolean,
    role: 'USER' | 'ADMIN'
}