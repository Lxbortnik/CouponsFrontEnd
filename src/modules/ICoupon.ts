
export interface ICoupon {
    id: number;
    title: string;
    description: string;
    price: number;
    companyId: number;
    categoryId: number;
    startDate: Date;
    endDate: Date;
    amount: number;
    imageUrl: string
}