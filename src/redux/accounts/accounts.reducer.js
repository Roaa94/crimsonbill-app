import {AccountsActionTypes} from "./accounts.action-types";
import {addAccountBalances, addAccountTransactions} from "./accounts.redux-utils";

const INITIAL_STATE = {
    accountsArray: [],
    isFetchingAccounts: false,
    isFetchingBalances: false,
    isFetchingTransactions: false,
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
        case AccountsActionTypes.FETCH_BALANCES_START:
            return {
                ...state,
                isFetchingBalances: true,
            }
        case AccountsActionTypes.FETCH_BALANCES_SUCCESS:
            return {
                ...state,
                isFetchingBalances: false,
                accountsArray: addAccountBalances(state.accountsArray, action.payload),
            };
        case AccountsActionTypes.FETCH_BALANCES_ERROR:
            return {
                ...state,
                isFetchingBalances: false,
                errorMessage: action.payload,
            };
        case AccountsActionTypes.FETCH_TRANSACTIONS_START:
            return {
                ...state,
                isFetchingTransactions: true,
            }
        case AccountsActionTypes.FETCH_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                isFetchingTransactions: false,
                accountsArray: addAccountTransactions(state.accountsArray, action.payload),
            };
        case AccountsActionTypes.FETCH_TRANSACTIONS_ERROR:
            return {
                ...state,
                isFetchingTransactions: false,
                errorMessage: action.payload,
            };
        default:
            return state;
    }
};

export default accountsReducer;