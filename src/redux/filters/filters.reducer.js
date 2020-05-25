import {FiltersActionTypes} from "./filters.action-types";
import {setFilterValueInState} from "./filters.redix-utils";

const INITIAL_STATE = {
    transactionCategoryId: '',
    transactionSourceId: '',
    transactionType: '',
    accountId: '',
    startDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
};

const filtersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FiltersActionTypes.SET_FILTER_VALUE:
            return setFilterValueInState(state, action.payload);
        default:
            return state;
    }
}

export default filtersReducer;