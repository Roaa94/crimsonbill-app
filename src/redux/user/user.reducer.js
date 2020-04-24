import {userActionTypes} from "./user.action-types";

const userReducer = (state = null, action) => {
    switch (action.type) {
        case userActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                ...action.payload
            };
        case userActionTypes.UPDATE_USER_AVATAR:
            return {
                ...state,
                avatarUrl: action.payload
            };
        case userActionTypes.UPDATE_USER_ACCOUNTS:
            return {
                ...state,
                accounts: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;