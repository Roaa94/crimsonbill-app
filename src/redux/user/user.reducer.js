import {UserActionTypes} from "./user.action-types";

const INITIAL_STATE = {
    userData: null,
    isCalculatingBalance: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_USER:
            return {
                ...state,
                userData: action.payload,
            };
        case UserActionTypes.TOGGLE_IS_CALCULATING_BALANCE:
            return {
                ...state,
                isCalculatingBalance: action.payload,
            }
        default:
            return state;
    }
};

export default userReducer;