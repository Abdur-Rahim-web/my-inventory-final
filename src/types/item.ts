export interface IReview {
    user: string;
    rating: number;
    comment: string;
    date: Date;
}

export interface IItem {
    fullDesc: string;
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    image?: string;
    createdAt: Date;
    reviews: IReview[];
}