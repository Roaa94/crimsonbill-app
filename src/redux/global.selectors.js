import {createSelector} from "reselect";
import {selectIsFetchingAccounts} from "./accounts/accounts.selectors";
import {selectIsFetchingBalances} from "./balances/balances.selectors";
import {selectIsFetchingTransactions} from "./transactions/transactions.selectors";

export const selectIsLoadingAllAccountsData = createSelector(
    [selectIsFetchingAccounts, selectIsFetchingBalances, selectIsFetchingTransactions],
    (isFetchingAccounts, isFetchingBalances, isFetchingTransactions) => {
        return isFetchingAccounts || isFetchingBalances || isFetchingTransactions;
    }
);