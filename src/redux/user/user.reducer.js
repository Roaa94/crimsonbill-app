import {UserActionTypes} from "./user.action-types";

const userReducer = (state = null, action) => {
    switch (action.type) {
        case UserActionTypes.SET_USER:
            return action.payload;
        default:
            return state;
    }
};

export default userReducer;