export interface Product {
    id: number,
    srcUrl: string[],
    name: string,
    category: string,
    room: string,
    color: string,
    description: {
        desc: string,
        dimensions: string,
        material: string,
        weight: string,
    },
    postingDate: string,
    price: number
}


