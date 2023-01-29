export interface User {
    id?: number,
    key: number,
    firstName: string,
    lastName: string,
    phone: string,
    address: string,
    email: string,
    birthDate: string,
    username: string,
}

export interface UserCred {
    id?: number,
    username: string,
    password: string,
    active: boolean,
    role: 'USER' | 'ADMIN'
}