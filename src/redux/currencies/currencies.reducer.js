import {CurrenciesActionTypes} from "./currencies.action-types";

const INITIAL_STATE = {
    appCurrencies: [],
    isFetchingCurrencies: false,
    errorMessage: '',
};

export const currenciesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CurrenciesActionTypes.FETCH_CURRENCIES_START:
            return {
                ...state,
                isFetchingCurrencies: true,
            }
        case CurrenciesActionTypes.FETCH_CURRENCIES_SUCCESS:
            return {
                ...state,
                appCurrencies: action.payload,
                isFetchingCurrencies: false,
            }
        case CurrenciesActionTypes.FETCH_CURRENCIES_ERROR:
            return {
                ...state,
                isFetchingCurrencies: false,
                errorMessage: action.payload,
            }
        default:
            return state;
    }
}