import {accountFormActionTypes} from "./account-form.action-types";

const INITIAL_STATE = {
    accountFormShow: false,
    balanceFormShow: false,
    transactionFormShow: false,
}

const accountFormReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case accountFormActionTypes.TOGGLE_ACCOUNT_FORM:
            return {
                ...state,
                accountFormShow: action.payload,
            };
        case accountFormActionTypes.TOGGLE_BALANCE_FORM:
            return {
                ...state,
                balanceFormShow: action.payload,
            };
        case accountFormActionTypes.TOGGLE_TRANSACTION_FORM:
            return {
                ...state,
                transactionFormShow: action.payload,
            };
        default:
            return state;
    }
}

export default accountFormReducer;