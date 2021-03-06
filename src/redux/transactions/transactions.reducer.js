import {TransactionsActionTypes} from "./transactions.action-types";

const INITIAL_STATE = {
    transactionsArray: [],
    isFetchingTransactions: false,
    errorMessage: undefined,
    accountFormShow: false,
    transactionsDrawerOpen: true,
};

const transactionsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TransactionsActionTypes.FETCH_TRANSACTIONS_START:
            return {
                ...state,
                isFetchingTransactions: true,
            }
        case TransactionsActionTypes.FETCH_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                isFetchingTransactions: false,
                transactionsArray: action.payload,
            };
        case TransactionsActionTypes.FETCH_TRANSACTIONS_ERROR:
            return {
                ...state,
                isFetchingTransactions: false,
                errorMessage: action.payload,
            };
        case TransactionsActionTypes.TOGGLE_TRANSACTIONS_DRAWER:
            return {
                ...state,
                transactionsDrawerOpen: action.payload,
            }
        default:
            return state;
    }
};

export default transactionsReducer;