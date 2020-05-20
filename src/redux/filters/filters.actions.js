import {FiltersActionTypes} from "./filters.action-types";

export const setFilterValue = filterData => ({
    type: FiltersActionTypes.SET_FILTER_VALUE,
    payload: filterData,
})