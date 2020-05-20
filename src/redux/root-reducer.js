import storage from 'redux-persist/lib/storage';
import userReducer from "./user/user.reducer";
import {persistReducer} from "redux-persist";
import {combineReducers} from "redux";
import accountsReducer from "./accounts/accounts.reducer";
import {taxonomiesReducer} from "./taxonomies/taxonomies.reducer";
import {currenciesReducer} from "./currencies/currencies.reducer";
import balancesReducer from "./balances/balances.reducer";
import transactionsReducer from "./transactions/transactions.reducer";
import filtersReducer from "./filters/filters.reducer";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['filters'],
};

const rootReducer = combineReducers({
    user: userReducer,
    accounts: accountsReducer,
    balances: balancesReducer,
    transactions: transactionsReducer,
    taxonomies: taxonomiesReducer,
    currencies: currenciesReducer,
    filters: filtersReducer,
});

export default persistReducer(persistConfig, rootReducer);