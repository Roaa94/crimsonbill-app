import storage from 'redux-persist/lib/storage';
import userReducer from "./user/user.reducer";
import {persistReducer} from "redux-persist";
import {combineReducers} from "redux";
import accountsReducer from "./accounts/accounts.reducer";
import {taxonomiesReducer} from "./taxonomies/taxonomies.reducer";
import {currencyReducer} from "./currency/currency.reducer";

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    user: userReducer,
    accounts: accountsReducer,
    taxonomies: taxonomiesReducer,
    currency: currencyReducer,
});

export default persistReducer(persistConfig, rootReducer);