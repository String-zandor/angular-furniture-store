import { CartItem } from "../../cart/models/cart-item";

export interface User {
    id?: number,
    firstName: string,
    middleName: string,
    lastName: string,
    phone: string,
    address: string,
    email: string,
    birthDate: string,
    interests: string[],
    username: string,
    password: string,
    admin: boolean
}
