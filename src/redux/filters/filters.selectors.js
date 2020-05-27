import {createSelector} from "reselect";

export const selectFilters = state => state.filters;

export const selectFilterByName = filterName => createSelector(
    [selectFilters],
    filters => filters[filterName],
);

export const selectDateRangeDays = createSelector(
    [selectFilterByName('startDate'), selectFilterByName('endDate')],
    (startDate, endDate) => {
        let days = [];
        let day = startDate;
        days.push(day);
        while (day < endDate) {
            day = new Date(day.getTime() + 24 * 60 * 60 * 1000);
            days.push(day);
        }
        return days;
    }
);

export const selectAccountsPageFiltersCardExpanded = createSelector(
    [selectFilters],
    filters => filters.accountsPageFiltersCardExpanded,
);