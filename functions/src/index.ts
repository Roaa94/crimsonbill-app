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

const updateBalanceTotal = async (userId: String, accountId: String, balanceId: String) => {
    const balanceDocPath = `users/${userId}/accounts/${accountId}/balances/${balanceId}`;
    const balanceDocRef = db.doc(balanceDocPath);
    const transactionsCollectionPath = `${balanceDocPath}/transactions`;
    const transactionsCollectionRef = db.collection(transactionsCollectionPath);

    transactionsCollectionRef.get().then(transactionCollectionSnapshot => {
        let total = 0;
        transactionCollectionSnapshot.docs.forEach(doc => {
            const transactionData = doc.data();
            total = transactionData.type === 'spending'
                ? total - +transactionData.amount
                : total + +transactionData.amount;
        });
        return balanceDocRef.update({totalBalance: total});
    }).catch(error => error.message)
}

export const updateBalanceTotalOnTransactionWrite = functions.firestore
    .document('users/{userId}/accounts/{accountId}/balances/{balanceId}/transactions/{transactionId}')
    .onWrite((change, context) => {
        const params = context.params;
        return updateBalanceTotal(params.userId, params.accountId, params.balanceId);
    })

const updateAccountTotal = async (userId: String, accountId: String) => {
    const accountDocPath = `users/${userId}/accounts/${accountId}`;
    const accountDocRef = db.doc(accountDocPath);
    const balancesCollectionPath = `${accountDocPath}/balances`;
    const balancesCollectionRef = db.collection(balancesCollectionPath);

    balancesCollectionRef.get().then(balanceCollectionSnapshot => {
        let total = 0;
        balanceCollectionSnapshot.docs.forEach(doc => {
            const balanceData = doc.data();
            total += +balanceData.totalBalance;
        });
        return accountDocRef.update({totalBalance: total});
    }).catch(error => error.message)
}

export const updateAccountTotalOnBalanceUpdate = functions.firestore
    .document('users/{userId}/accounts/{accountId}/balances/{balanceId}')
    .onUpdate((change, context) => {
        const params = context.params;
        return updateAccountTotal(params.userId, params.accountId);
    })

export const updateAccountTotalOnBalanceDelete = functions.firestore
    .document('users/{userId}/accounts/{accountId}/balances/{balanceId}')
    .onDelete((change, context) => {
        const params = context.params;
        return updateAccountTotal(params.userId, params.accountId);
    })