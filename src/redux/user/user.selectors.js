import {createSelector} from "reselect";

export const selectUser = state => state.user;

export const selectUserId = createSelector(
    [selectUser],
    user => user.id,
);

export const selectDefaultCurrencyCode = createSelector(
    [selectUser],
    user => user.defaultCurrencyCode,
)