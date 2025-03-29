import { ICategory } from "../modules/ICategory";
import { ICompany } from "../modules/ICompany";
import { ICouponDetails } from "../modules/ICouponDetails";
import { ICustomer } from "../modules/ICustomer";
import { IPurchase } from "../modules/IPurchase";
import { IUser } from "../modules/IUser";
import { IUserLogin } from "../modules/IUserLogin";

export class AppState {
       public coupons: ICouponDetails[] = [];
       public companies: ICompany[] = [];
       public categories: ICategory[] = [];
       public companyFilter: number | null = null;
       public categoryFilter: number | null = null;
       public userTypeFilter: string | null = null;
       public usersFilter: number | null = null;

       public userLogin: IUserLogin = {
              userId: 0,
              companyId: 0,
              userType: "",
              token: ""
       };
       public users: IUser[] = [];
       public customers: ICustomer[] = [];
       public purchases: IPurchase[] = [];

};