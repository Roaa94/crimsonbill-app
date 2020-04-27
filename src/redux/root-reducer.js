import storage from 'redux-persist/lib/storage';
import accountFormReducer from './account-form/account-form.reducer';
import userReducer from "./user/user.reducer";
import {persistReducer} from "redux-persist";
import {combineReducers} from "redux";
import accountsReducer from "./accounts/accounts.reducer";

const persistConfig = {
    key: 'root',
    storage,
    // Todo: uncomment this at the end
    // blacklist: ['accountForm'],
};

const rootReducer = combineReducers({
    user: userReducer,
    accounts: accountsReducer,
    accountForm: accountFormReducer,
});

export default persistReducer(persistConfig, rootReducer);