import {TaxonomiesActionTypes} from "./taxonomies.action-types";
import {appTaxonomies} from "../../app-data/taxonomies";
import {convertCollectionToArray, firestore} from "../../firebase/firebase.utils";

export const fetchTaxonomiesStart = () => ({
    type: TaxonomiesActionTypes.FETCH_TAXONOMIES_START,
});

export const fetchTaxonomiesError = errorMessage => ({
    type: TaxonomiesActionTypes.FETCH_TAXONOMIES_ERROR,
    payload: errorMessage,
});

export const fetchTaxonomiesSuccess = taxonomies => ({
    type: TaxonomiesActionTypes.FETCH_TAXONOMIES_SUCCESS,
    payload: taxonomies,
})

export const fetchTaxonomiesStartAsync = userId => {
    return dispatch => {
        dispatch(fetchTaxonomiesStart());
        let taxonomies = {};
        appTaxonomies.forEach(({name}) => {
            const taxonomyCollectionPath = `users/${userId}/settings/TAXONOMIES/${name}`;
            const taxonomyCollectionRef = firestore.collection(taxonomyCollectionPath);
            const orderedTaxonomiesRef = taxonomyCollectionRef.orderBy('createdAt', 'asc');
            orderedTaxonomiesRef.onSnapshot(taxonomyCollectionSnapshot => {
                taxonomies[name] = convertCollectionToArray(taxonomyCollectionSnapshot);
                console.log('fetching taxonomies: ', name);
                dispatch(fetchTaxonomiesSuccess(taxonomies));
            }, error => dispatch(fetchTaxonomiesError(error.message)));
        })
    }
};