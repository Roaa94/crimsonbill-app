import {userActionTypes} from "./user.action-types";

const INITIAL_STATE = {
    currentUser: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        case userActionTypes.UPDATE_USER_AVATAR:
            return {
                ...state,
                currentUser: {...state.currentUser, avatarUrl: action.payload}
            };
        case userActionTypes.UPDATE_USER_ACCOUNTS:
            return {
                ...state,
                currentUser: {...state.currentUser, accounts: action.payload}
            };
        default:
            return state;
    }
};

export default userReducer;