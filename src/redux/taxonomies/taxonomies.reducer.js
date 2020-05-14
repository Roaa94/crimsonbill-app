import {TaxonomiesActionTypes} from "./taxonomies.action-types";

const INITIAL_STATE = {
    taxonomiesData: {
        categories: [],
        accountTypes: [],
        incomeSources: [],
        spendingCategories: [],
    },
    isFetchingTaxonomies: false,
    errorMessage: '',
}

export const taxonomiesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TaxonomiesActionTypes.FETCH_TAXONOMIES_START:
            return {
                ...state,
                isFetchingTaxonomies: true,
            }
        case TaxonomiesActionTypes.FETCH_TAXONOMIES_SUCCESS:
            return {
                ...state,
                taxonomiesData: action.payload,
                isFetchingTaxonomies: false,
            }
        case TaxonomiesActionTypes.FETCH_TAXONOMIES_ERROR:
            return {
                ...state,
                isFetchingTaxonomies: false,
                errorMessage: action.payload,
            }
        default:
            return state;
    }
}