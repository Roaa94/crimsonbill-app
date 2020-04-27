import {accountsActionTypes} from "./accounts.action-types";

const INITIAL_STATE = {
    accountsArray: [],
    isFetchingAccounts: false,
    errorMessage: undefined,
};

const accountsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case accountsActionTypes.FETCH_ACCOUNTS_START:
            return {
                ...state,
                isFetchingAccounts: true,
            }
        case accountsActionTypes.FETCH_ACCOUNTS_SUCCESS:
            return {
                ...state,
                isFetchingAccounts: false,
                accountsArray: action.payload,
            };
        case accountsActionTypes.FETCH_ACCOUNTS_ERROR:
            return {
                ...state,
                isFetchingAccounts: false,
                errorMessage: action.payload,
            };
        default:
            return state;
    }
};

export default accountsReducer;