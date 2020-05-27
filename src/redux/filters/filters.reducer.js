import {FiltersActionTypes} from "./filters.action-types";
import {setFilterValueInState} from "./filters.redux-utils";

const INITIAL_STATE = {
    transactionCategoryId: '',
    transactionSourceId: '',
    transactionType: '',
    accountId: '',
    startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
    accountsPageFiltersCardExpanded: false,
};

const filtersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FiltersActionTypes.SET_FILTERS:
            return {
                ...state,
                ...action.payload,
            }
        case FiltersActionTypes.SET_FILTER_VALUE:
            return setFilterValueInState(state, action.payload);
        case FiltersActionTypes.TOGGLE_ACCOUNTS_PAGE_FILTERS_CARD:
            return {
                ...state,
                accountsPageFiltersCardExpanded: action.payload,
            }
        default:
            return state;
    }
}

export default filtersReducer;