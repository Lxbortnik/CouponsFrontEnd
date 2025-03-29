
export interface IUser {
    id: number;
    username: string;
    password: string;
    userType: string;
    companyId: number | null;
}