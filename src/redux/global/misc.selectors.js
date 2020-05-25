import {createSelector} from "reselect";
import {selectIsFetchingAccounts} from "../accounts/accounts.selectors";
import {selectIsFetchingBalances} from "../balances/balances.selectors";
import {selectIsFetchingTransactions} from "../transactions/transactions.selectors";
import {selectAppCurrencies} from "../currencies/currencies.selectors";
import {selectDefaultCurrencyCode} from "../user/user.selectors";

export const selectIsLoadingAllAccountsData = createSelector(
    [selectIsFetchingAccounts, selectIsFetchingBalances, selectIsFetchingTransactions],
    (isFetchingAccounts, isFetchingBalances, isFetchingTransactions) => {
        return isFetchingAccounts || isFetchingBalances || isFetchingTransactions;
    }
);

export const selectDefaultCurrencyData = createSelector(
    [selectAppCurrencies, selectDefaultCurrencyCode],
    (appCurrencies, defaultCurrencyCode) => appCurrencies.find(currency => currency.code === defaultCurrencyCode),
);