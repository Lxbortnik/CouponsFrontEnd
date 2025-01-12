import { createStore } from 'redux';
import reducer from "./Reducer";
import { AppState } from "./AppState";

export const store = createStore(reducer, new AppState());