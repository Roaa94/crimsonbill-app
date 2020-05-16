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

export const selectDefaultCurrencyCode = createSelector(
    [selectDefaultCurrency],
    defaultCurrency => {
        if(defaultCurrency) {
            return defaultCurrency.code;
        }
    },
);

export const selectOtherCurrenciesCodes = createSelector(
    [selectAppCurrencies],
    appCurrencies => {
        const otherCurrencies = appCurrencies.filter(currency => !currency.isDefault);
        return otherCurrencies.map(currency => currency.code);
    }
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