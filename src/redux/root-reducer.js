import storage from 'redux-persist/lib/storage';
import accountFormReducer from './account-form/account-form.reducer';
import userReducer from "./user/user.reducer";
import {persistReducer} from "redux-persist";
import {combineReducers} from "redux";
import loadingReducer from "./loaders/loaders.reducer";

const persistConfig = {
    key: 'root',
    storage,
    // Todo: uncomment this at the end
    // blacklist: ['accountForm', 'loaders'],
};

const rootReducer = combineReducers({
    user: userReducer,
    accountForm: accountFormReducer,
    loaders: loadingReducer,
});

export default persistReducer(persistConfig, rootReducer);