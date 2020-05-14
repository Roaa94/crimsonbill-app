import {createSelector} from "reselect";

const selectTaxonomies = state => state.taxonomies;

export const selectTaxonomiesData = createSelector(
    [selectTaxonomies],
    taxonomies => taxonomies.taxonomiesData,
);

export const selectTaxonomyArray = taxonomyName => createSelector(
    [selectTaxonomiesData],
    taxonomiesData => {
        if (taxonomiesData[taxonomyName]) {
            return taxonomiesData[taxonomyName];
        } else {
            return [];
        }
    },
);

export const selectTaxonomyValue = (taxonomyId, taxonomyName) => createSelector(
    [selectTaxonomyArray(taxonomyName)],
    taxonomyArray => taxonomyArray.find(taxonomy => taxonomy.id === taxonomyId),
);