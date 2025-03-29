import { ActionType } from "./ActionType";

export interface Action<T = any> {
    type: ActionType;
    payload?: T;  
  }