import {SettingsActionTypes} from "./settings.action-types";
import {appTaxonomies} from "../../data";
import {fetchTaxonomies} from "../../firebase/taxonomies.firebase-utils";

export const fetchTaxonomiesStart = () => ({
    type: SettingsActionTypes.FETCH_TAXONOMIES_START,
});

export const fetchTaxonomiesError = errorMessage => ({
    type: SettingsActionTypes.FETCH_TAXONOMIES_ERROR,
    payload: errorMessage,
});

export const fetchTaxonomiesSuccess = taxonomies => ({
    type: SettingsActionTypes.FETCH_TAXONOMIES_SUCCESS,
    payload: taxonomies,
})

export const fetchTaxonomiesStartAsync = userId => {
    return async dispatch => {
        dispatch(fetchTaxonomiesStart());
        let taxonomies = {};
        try {
            for await (const {name} of appTaxonomies) {
                taxonomies[name] = await fetchTaxonomies(userId, name);
            }
        } catch (e) {
            console.log('Error fetching taxonomies', e.message);
            dispatch(fetchTaxonomiesError(e.message));
        }
        console.log('taxonomies');
        console.log(taxonomies);
        dispatch(fetchTaxonomiesSuccess(taxonomies));
    }
};