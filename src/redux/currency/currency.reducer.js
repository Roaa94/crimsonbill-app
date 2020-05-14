import {defaultCurrency} from "../../app-data/currency";

const INITIAL_STATE = {
    defaultCurrency: defaultCurrency,
    appCurrencies: [],
};

export const currencyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
}