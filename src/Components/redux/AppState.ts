import { IUserLogin } from "../interfaces/IUserLogin";

export class AppState {
    public userLogin:IUserLogin ={
        userId: 0,
        companyId: 0,
        userType: "",
        token: ""
    };

};