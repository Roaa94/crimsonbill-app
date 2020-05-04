import {AccountFormActionTypes} from "./account-form.action-types";

const INITIAL_STATE = {
    accountFormShow: false,
    balanceFormShow: false,
    transactionFormShow: false,
}

const accountFormReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AccountFormActionTypes.TOGGLE_ACCOUNT_FORM:
            return {
                ...state,
                accountFormShow: action.payload,
            };
        case AccountFormActionTypes.TOGGLE_BALANCE_FORM:
            return {
                ...state,
                balanceFormShow: action.payload,
            };
        case AccountFormActionTypes.TOGGLE_TRANSACTION_FORM:
            return {
                ...state,
                transactionFormShow: action.payload,
            };
        default:
            return state;
    }
}

export default accountFormReducer;