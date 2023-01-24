export interface PriceRange { min: number, max?: number, append?: string }

export const PRICE_RANGES: PriceRange[] = [
    { min: 0, max: 4999},
    { min: 5000, max: 9999},
    { min: 10000, max: 14999},
    { min: 15000, max: 19999},
    { min: 20000, append: 'and above'}
];