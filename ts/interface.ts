interface RatingInterface {
    rate: number;
    count: number;
}

export interface ProductInterface {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string
    image: string;
    rating: RatingInterface;
    quantity: number;

}