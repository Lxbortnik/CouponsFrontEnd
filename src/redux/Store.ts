import { createStore } from "redux";
import { AppState } from "./AppState";
import reducer from "./Reducer";

export const store = createStore(reducer, new AppState());