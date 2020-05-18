import {AccountsActionTypes} from "./accounts.action-types";

const INITIAL_STATE = {
    accountsArray: [],
    isFetchingAccounts: false,
    errorMessage: undefined,
    accountFormShow: false,
};

const accountsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AccountsActionTypes.TOGGLE_ACCOUNT_FORM:
            return {
                ...state,
                accountFormShow: action.payload,
            };
        case AccountsActionTypes.FETCH_ACCOUNTS_START:
            return {
                ...state,
                isFetchingAccounts: true,
            }
        case AccountsActionTypes.FETCH_ACCOUNTS_SUCCESS:
            return {
                ...state,
                isFetchingAccounts: false,
                accountsArray: action.payload,
            };
        case AccountsActionTypes.FETCH_ACCOUNTS_ERROR:
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