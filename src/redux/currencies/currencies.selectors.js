import {createSelector} from "reselect";

export const selectCurrencies = state => state.currencies;

export const selectAppCurrencies = createSelector(
    [selectCurrencies],
    currencies => currencies.appCurrencies,
);

export const selectDefaultCurrency = createSelector(
    [selectAppCurrencies],
    appCurrencies => appCurrencies.find(currency => currency.isDefault)
);