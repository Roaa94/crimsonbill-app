import {createSelector} from "reselect";

export const selectSettings = state => state.settings;

export const selectTaxonomies = createSelector(
    [selectSettings],
    settings => settings.taxonomies,
);

export const selectTaxonomyArray = taxonomyName => createSelector(
    [selectTaxonomies],
    taxonomies => taxonomies[taxonomyName],
);

export const selectTaxonomyValue = (taxonomyId, taxonomyName) => createSelector(
    [selectTaxonomyArray(taxonomyName)],
    taxonomyArray => taxonomyArray.find(taxonomy => taxonomy.id === taxonomyId),
);