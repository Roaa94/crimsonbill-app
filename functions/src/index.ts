import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

//The function works fine but it makes the onSnapshot listener fire a lot of time and it's too slow
export const balanceUpdated = functions.firestore
    .document('users/{userId}/accounts/{accountId}/balances/{balanceId}')
    .onUpdate((change, context) => {
        const oldBalanceData = change.before.data();
        const newBalanceData = change.after.data();
        if (oldBalanceData && newBalanceData) {

            const accountPath = `users/${context.params.userId}/accounts/${context.params.accountId}`;
            const accountRef = admin.firestore().doc(accountPath)
            accountRef.get().then(snapshot => {
                const accountData = snapshot.data();
                if (accountData) {
                    const oldAccountTotalBalance = accountData.totalBalance;
                    const newAccountTotalBalance = +oldAccountTotalBalance + (+newBalanceData.totalBalance - +oldBalanceData.totalBalance);
                    console.log('accountData');
                    console.log(accountData);
                    console.log(`newAccountTotalBalance: ${newAccountTotalBalance}`);
                    return accountRef.update({totalBalance: newAccountTotalBalance});
                }
                return null;
            }).catch(error => error.message);
            return null;
        }
        return null;
    })
