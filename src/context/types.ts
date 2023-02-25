import { actionTypes } from "./reducer";

export interface User {
  email?: string;
  password?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  iat?: number;
  token?: string;
}

export enum MODE {
  dark,
  light,
}

export interface ContextType {
  user: User | null;
  mode: MODE;
}

export interface ContextAction {
  type: actionTypes;
  user?: User;
  mode?: MODE;
}
