import storage from 'redux-persist/lib/storage';
import userReducer from "./user/user.reducer";
import {persistReducer} from "redux-persist";
import {combineReducers} from "redux";
import accountsReducer from "./accounts/accounts.reducer";
import {settingsReducer} from "./settings/settings.reducer";

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    user: userReducer,
    accounts: accountsReducer,
    settings: settingsReducer,
});

export default persistReducer(persistConfig, rootReducer);