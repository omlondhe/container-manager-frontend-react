import { ContextAction, ContextType, MODE, User } from "./types";

export const initialState: ContextType = {
  user: null,
  mode: MODE.light,
};

export enum actionTypes {
  SET_USER = "SET USER",
  REMOVE_USER = "REMOVE USER",
  CHANGE_MODE = "CHANGE MODE",
}

const reducer = (state: ContextType, action: ContextAction): ContextType => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user!,
      };

    case actionTypes.REMOVE_USER:
      return {
        ...state,
        user: null,
      };

    case actionTypes.CHANGE_MODE:
      return {
        ...state,
        mode: action.mode!,
      };

    default:
      return state;
  }
};

export default reducer;
