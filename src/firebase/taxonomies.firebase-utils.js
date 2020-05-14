import {firestore} from "./firebase.utils";
import {appTaxonomies} from "../data";

export const initDefaultTaxonomies = async userId => {
    console.log('setting default settings ...');

    for await (let {name, defaultValues} of appTaxonomies) {
        if (defaultValues) {
            await initTaxonomyDefaults(userId, name, defaultValues);
        }
    }
}

const initTaxonomyDefaults = async (userId, collectionName, defaultValues) => {
    console.log(`writing: ${collectionName}`);

    const taxonomyCollectionPath = `users/${userId}/settings/TAXONOMIES/${collectionName}`;
    const batch = firestore.batch();
    defaultValues.forEach(value => {
        //init new document
        const createdAt = new Date();
        const data = {
            createdAt,
            isDefault: true,
            ...value,
        }
        const accountTypeDocRef = firestore.collection(taxonomyCollectionPath).doc();
        batch.set(accountTypeDocRef, data);
    });
    try {
        await batch.commit();
    } catch (e) {
        console.log('batch commit error');
        console.log(e.message);
    }
}

export const addTaxonomy = async (userId, taxonomyCollectionName, taxonomyData) => {
    const taxonomyCollectionPath = `users/${userId}/settings/TAXONOMIES/${taxonomyCollectionName}`;
    const taxonomyDocRef = firestore.collection(taxonomyCollectionPath).doc();
    const taxonomyDocSnapshot = await taxonomyDocRef.get();
    if (!taxonomyDocSnapshot.exists) {
        try {
            await taxonomyDocRef.set(taxonomyData);
        } catch (error) {
            console.log('Failure in adding taxonomy', error.message);
        }
    } else {
        console.log('Taxonomy already exists');
    }
}