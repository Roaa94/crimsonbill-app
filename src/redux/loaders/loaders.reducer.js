import {loadersActionTypes} from "./loaders.action-types";

const INITIAL_STATE = {
    accountLoading: false,
};

const loadingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case loadersActionTypes.TOGGLE_ACCOUNT_LOADING:
            return {
                ...state,
                accountLoading: action.payload,
            }
        default:
            return state;
    }
}

export default loadingReducer;