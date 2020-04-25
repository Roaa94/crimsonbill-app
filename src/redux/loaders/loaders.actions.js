import {loadersActionTypes} from "./loaders.action-types";

export const toggleAccountLoading = value => ({
    type: loadersActionTypes.TOGGLE_ACCOUNT_LOADING,
    payload: value,
});