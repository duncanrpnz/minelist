import { AUTHENTICATE, DEAUTHENTICATE, AUTHENTICATE_FAIL } from "../actionTypes";
import { HYDRATE } from "next-redux-wrapper";

const initialState = { token: null, error: null };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...action.payload
      };
    case AUTHENTICATE:
      return { ...state, token: action.payload };
    case AUTHENTICATE_FAIL:
      return {...state, error: action.payload};
    case DEAUTHENTICATE:
      return { token: null };
    default:
      return state;
  }
};

export default authReducer;
