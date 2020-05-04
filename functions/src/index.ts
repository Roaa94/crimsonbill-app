import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

//Todo: configure the bellow batch writes for collections with +500 documents

export const deleteBalanceSubCollections = functions.firestore
    .document('users/{userId}/accounts/{accountId}/balances/{balanceId}')
    .onDelete((snapshot, context) => {
        const batch = db.batch();
        const transactionsPath = `users/${context.params.userId}/accounts/${context.params.accountId}/balances/${context.params.balanceId}/transactions`;
        db.collection(transactionsPath).get()
            .then(transactionsSnapshot => {
                transactionsSnapshot.docs.forEach(doc => {
                    batch.delete(doc.ref);
                })
                return batch.commit();
            })
            .catch(error => error.message)
        return null;
    })

export const deleteAccountSubCollections = functions.firestore
    .document('users/{userId}/accounts/{accountId}')
    .onDelete((snapshot, context) => {
        const batch = db.batch();
        const balancesPath = `users/${context.params.userId}/accounts/${context.params.accountId}/balances`;
        db.collection(balancesPath).get()
            .then(balancesSnapshot => {
                balancesSnapshot.docs.forEach(doc => {
                    batch.delete(doc.ref);
                })
                return batch.commit();
            }).catch(error => error.message)
        return null;
    })

export const updateBalanceTotal = functions.firestore
    .document('users/{userId}/accounts/{accountId}/balances/{balanceId}/transactions/{transactionId}')
    .onUpdate((change, context) => {
        const params = context.params;
        const balanceDocPath = `users/${params.userId}/accounts/${params.accountId}/balances/${params.balanceId}`;
        const balanceDocRef = db.doc(balanceDocPath);
        const transactionsCollectionPath = `${balanceDocPath}/transactions`;
        const transactionsCollectionRef = db.collection(transactionsCollectionPath);

        transactionsCollectionRef.get().then(transactionCollectionSnapshot => {
            let total = 0;
            transactionCollectionSnapshot.docs.forEach(doc => {
                const transactionData = doc.data();
                total = transactionData.type === 'spending' ? total - +transactionData.amount : total + +transactionData.amount;
            });
            return balanceDocRef.update({totalBalance: total});
        }).catch(error => error.message)
        return null;
    })