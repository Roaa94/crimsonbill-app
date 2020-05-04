import {AccountFormActionTypes} from "./account-form.action-types";

export const toggleAccountForm = value => ({
    type: AccountFormActionTypes.TOGGLE_ACCOUNT_FORM,
    payload: value,
});