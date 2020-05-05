import {convertCollectionToArray, firestore} from "./firebase.utils";
import {appTaxonomies} from "../data";

export const initDefaultTaxonomies = async userId => {
    console.log('setting default settings ...');

    for await (let {name, defaultValues} of appTaxonomies) {
        await initTaxonomyDefaults(userId, name, defaultValues);
    }
}

const initTaxonomyDefaults = async (userId, collectionName, defaultValues) => {
    console.log(`writing: ${collectionName}`);

    const taxonomyCollectionPath = `users/${userId}/settings/TAXONOMIES/${collectionName}`;
    const batch = firestore.batch();
    defaultValues.forEach(value => {
        //init new document
        const accountTypeDocRef = firestore.collection(taxonomyCollectionPath).doc();
        batch.set(accountTypeDocRef, value);
    });
    try {
        await batch.commit();
    } catch (e) {
        console.log('batch commit error');
        console.log(e.message);
    }
}

export const fetchTaxonomies = async (userId, collectionName) => {
    console.log(`Fetching: ${collectionName}`);
    const taxonomyCollectionPath = `users/${userId}/settings/TAXONOMIES/${collectionName}`;
    const taxonomyCollectionRef = firestore.collection(taxonomyCollectionPath);
    const taxonomyCollectionSnapshot = await taxonomyCollectionRef.get();
    return convertCollectionToArray(taxonomyCollectionSnapshot);
}