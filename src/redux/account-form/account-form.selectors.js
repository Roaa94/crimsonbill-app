import {createSelector} from 'reselect';

const selectAccountForm = state => state.accountForm;

export const selectAccountFormShow = createSelector(
    [selectAccountForm],
    accountForm => accountForm.accountFormShow,
);