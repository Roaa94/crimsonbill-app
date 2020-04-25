import {combineReducers} from "redux";
import userReducer from "./user/user.reducer";
import accountFormReducer from './account-form/account-form.reducer';
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    user: userReducer,
    accountForm: accountFormReducer,
});

export default persistReducer(persistConfig, rootReducer);