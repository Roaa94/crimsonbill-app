import {accountFormActionTypes} from "./account-form.action-types";

export const toggleAccountForm = value => ({
    type: accountFormActionTypes.TOGGLE_ACCOUNT_FORM,
    payload: value,
});