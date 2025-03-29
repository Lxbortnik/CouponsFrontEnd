import { Action } from "./Action";
import { ActionType } from "./ActionType";
import { AppState } from "./AppState";

const initialState = new AppState();

export default function reducer(
    oldAppState: AppState = initialState, action: Action): AppState {
    const newAppState = { ...oldAppState };
    switch (action.type) {


        case ActionType.getAllCoupons:
            newAppState.coupons = action.payload;
            break;



        case ActionType.updateUserLogin:
            if (action.payload.userType) {
                newAppState.userLogin.userType = action.payload.userType;
            }
            if (action.payload.companyId) {
                newAppState.userLogin.companyId = action.payload.companyId;
            }
            if (action.payload.userId) {
                newAppState.userLogin.userId = action.payload.userId;
            }
            if (action.payload.token) {
                newAppState.userLogin.token = action.payload.token;
            } break;

        case ActionType.getCategories:
            newAppState.categories = action.payload;
            break;


        case ActionType.getCompanies:
            newAppState.companies = action.payload;
            break;

        case ActionType.updateCompanyFilter:
            newAppState.companyFilter = action.payload;
            break;

        case ActionType.updateCategoryFilter:
            newAppState.categoryFilter = action.payload;
            break;
        case ActionType.updateUsersFilter:
            newAppState.usersFilter = action.payload;
            break;

        case ActionType.updateTypeFilter:
            newAppState.userTypeFilter = action.payload;
            break;


        case ActionType.getAllUsers:
            newAppState.users = action.payload;
            break;

        case ActionType.deleteUserByAdmin:
            return {
                ...oldAppState,
                users: oldAppState.users.filter(user => user.id !== action.payload),
            };
        case ActionType.createUserByAdmin:
            return {
                ...oldAppState,
                users: [...oldAppState.users, action.payload]
            };


        case ActionType.updateCompany:
            return {
                ...oldAppState,
                companies: oldAppState.companies.map(company =>
                    company.id === action.payload.id ? action.payload : company
                ),
            };
        case ActionType.deleteCompany:
            return {
                ...oldAppState,
                companies: oldAppState.companies.filter(company => company.id !== action.payload),
            };

        case ActionType.addCompany:
            return {
                ...oldAppState,
                companies: [...oldAppState.companies, action.payload]
            };


        case ActionType.updateCategory:
            return {
                ...oldAppState,
                categories: oldAppState.categories.map(category =>
                    category.id === action.payload.id ? action.payload : category
                ),
            };


        case ActionType.deleteCategory:
            newAppState.categories = oldAppState.categories.filter(
                (category) => category.id !== action.payload
            );
            break;

        case ActionType.addCategory:
            return {
                ...oldAppState,
                categories: [...oldAppState.categories, action.payload]
            };
        case ActionType.updateCoupon:
            return {
                ...oldAppState,
                coupons: oldAppState.coupons.map(coupon =>
                    coupon.id === action.payload.id ? action.payload : coupon
                ),
            };

        case ActionType.logOut:
            return new AppState();  //TODO why this reducer looks like this?
            break;

        case ActionType.addCoupon:
            return {
                ...oldAppState,
                coupons: [...oldAppState.coupons, action.payload]
            };

        case ActionType.deleteCustomerByAdmin:
            return {
                ...oldAppState,
                customers: oldAppState.customers.filter(customer => customer.id !== action.payload),
            };

        case ActionType.updateAllPurchase:
            newAppState.purchases = action.payload;
            break;


        case ActionType.deletePurchase:
            return {
                ...oldAppState,
                purchases: oldAppState.purchases.filter(purchase => purchase.id !== action.payload),
            }



    }


    console.log(JSON.stringify(newAppState))
    return newAppState;

}

