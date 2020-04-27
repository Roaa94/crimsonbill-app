import {userActionTypes} from "./user.action-types";

const INITIAL_STATE = {
    authData: null,
    accounts: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SET_USER_AUTH_DATA:
            return {
                ...state,
                authData: action.payload,
            };
        case userActionTypes.SET_USER_ACCOUNTS:
            return {
                ...state,
                accounts: action.payload,
            }
        default:
            return state;
    }
};

export default userReducer;