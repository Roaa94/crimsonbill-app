import {createSelector} from "reselect";

const selectLoaders = state => state.loaders;

export const selectAccountLoading = createSelector(
    [selectLoaders],
    loaders => loaders.accountLoading,
);