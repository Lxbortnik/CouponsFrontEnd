import { ActionType } from './ActionType';

export interface Action<T = any> {
  type: ActionType;
  payload?: T;  // TODO can be any type - why T and not any?
}