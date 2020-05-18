import {BalancesActionTypes} from "./balances.action-types";

const INITIAL_STATE = {
    balancesArray: [],
    isFetchingBalances: false,
    errorMessage: undefined,
    accountFormShow: false,
};

const balancesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BalancesActionTypes.FETCH_BALANCES_START:
            return {
                ...state,
                isFetchingBalances: true,
            }
        case BalancesActionTypes.FETCH_BALANCES_SUCCESS:
            return {
                ...state,
                isFetchingBalances: false,
                balancesArray: action.payload,
            };
        case BalancesActionTypes.FETCH_BALANCES_ERROR:
            return {
                ...state,
                isFetchingBalances: false,
                errorMessage: action.payload,
            };
        default:
            return state;
    }
};

export default balancesReducer;