export interface PriceRange { min: number, max?: number, append?: string }

export const PRICE_RANGES: PriceRange[] = [
    { min: 0, max: 19999},
    { min: 20000, max: 39999},
    { min: 40000, max: 59999},
    { min: 60000, max: 79999},
    { min: 80000, max: 99999},
    { min: 100000, append: 'and above'}
];