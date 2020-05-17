import {createSelector} from "reselect";

export const selectCurrencies = state => state.currencies;

export const selectAppCurrencies = createSelector(
    [selectCurrencies],
    currencies => currencies.appCurrencies,
);

export const selectCurrency = currencyId => createSelector(
    [selectAppCurrencies],
    appCurrencies => appCurrencies.find(currency => currency.id === currencyId),
);

export const selectCurrencyCode = currencyId => createSelector(
    [selectCurrency(currencyId)],
    currency => {
        if(currency) {
            return currency.code;
        }
    },
);

export const selectIsFetchingCurrencies = createSelector(
    [selectCurrencies],
    currencies => currencies.isFetchingCurrencies,
)