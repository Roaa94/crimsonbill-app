import {SettingsActionTypes} from "./settings.action-types";

const INITIAL_STATE = {
    taxonomies: {
        categories: [],
        accountTypes: [],
        incomeSources: [],
        spendingCategories: [],
    },
    isFetchingTaxonomies: false,
    errorMessage: '',
    currencies: [],
    appCurrency: null,
}

export const settingsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SettingsActionTypes.FETCH_TAXONOMIES_START:
            return {
                ...state,
                isFetchingTaxonomies: true,
            }
        case SettingsActionTypes.FETCH_TAXONOMIES_SUCCESS:
            return {
                ...state,
                taxonomies: action.payload,
                isFetchingTaxonomies: false,
            }
        case SettingsActionTypes.FETCH_TAXONOMIES_ERROR:
            return {
                ...state,
                isFetchingTaxonomies: false,
                errorMessage: action.payload,
            }
        default:
            return state;
    }
}