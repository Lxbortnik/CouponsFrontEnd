
export interface ICouponDetails {
    id: number;
    title: string;
    description: string;
    price: number;
    startDate: Date;
    endDate: Date;
    amount: number;
    imageUrl?: string;
    companyName: string;
    categoryName: string;
}