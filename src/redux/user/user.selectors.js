import {createSelector} from "reselect";

export const selectUser = state => state.user;

export const selectUserData = createSelector(
    [selectUser],
    user => user.userData,
);

export const selectUserId = createSelector(
    [selectUserData],
    userData => userData.id,
);

export const selectDefaultCurrencyCode = createSelector(
    [selectUserData],
    userData => userData.defaultCurrencyCode,
);

export const selectUserTotalBalance = createSelector(
    [selectUserData],
    userData => userData.totalBalance,
);

export const selectIsCalculatingBalance = createSelector(
    [selectUser],
    user => user.isCalculatingBalance,
);