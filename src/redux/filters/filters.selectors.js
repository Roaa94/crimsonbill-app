import {createSelector} from "reselect";

export const selectFilters = state => state.filters;

export const selectFilterByName = filterName => createSelector(
    [selectFilters],
    filters => filters[filterName],
);