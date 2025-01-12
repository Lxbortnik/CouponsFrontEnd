import { Action } from "./Action";
import { ActionType } from "./ActionType";
import { AppState } from "./AppState";

const initialState = new AppState(); // מצב התחלתי

export default function reducer(
    oldAppState: AppState = initialState, action: Action): AppState {
    const newAppState = { ...oldAppState };

    switch (action.type) {

        case ActionType.UpdateUserLogin:
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
            }

            console.log("Reducer invoked with action type:", action.type);
    break;
}
return newAppState;
}