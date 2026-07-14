export interface IItem {
    fullDesc: string;
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    image?: string;
    createdAt: Date;
}