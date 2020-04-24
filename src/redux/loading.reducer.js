import {createSelector} from "reselect";

const TOGGLE_LOADING = 'TOGGLE_LOADING';

export const toggleLoading = value => ({
    type: TOGGLE_LOADING,
    payload: value,
});

export const selectLoading = createSelector(
    [state => state.loading],
    loading => loading,
);

export const loadingReducer = (state = false, action) => {
    return action.type === TOGGLE_LOADING ? action.payload : state;
}
