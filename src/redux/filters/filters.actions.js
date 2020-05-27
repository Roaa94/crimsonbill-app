import {FiltersActionTypes} from "./filters.action-types";

export const setFilterValue = filterData => ({
    type: FiltersActionTypes.SET_FILTER_VALUE,
    payload: filterData,
});

export const setFilters = filtersData => ({
    type: FiltersActionTypes.SET_FILTERS,
    payload: filtersData,
});

export const toggleAccountsPageFiltersCard = value => ({
    type: FiltersActionTypes.TOGGLE_ACCOUNTS_PAGE_FILTERS_CARD,
    payload: value,
})