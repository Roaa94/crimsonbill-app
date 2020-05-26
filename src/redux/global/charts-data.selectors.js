import {createSelector} from "reselect";
import {compareDaysByTimestamp} from "../../utils/app.utils";
import {selectTransactionsByType} from "../transactions/transactions.selectors";
import {selectAppCurrencies} from "../currencies/currencies.selectors";
import {selectDefaultCurrencyCode} from "../user/user.selectors";
import {selectDateRangeDays} from "../filters/filters.selectors";
import {format} from "date-fns";
import {selectTaxonomyArray} from "../taxonomies/taxonomies.selectors";

export const selectActivityChartData = type => createSelector(
    [selectTransactionsByType(type), selectAppCurrencies, selectDefaultCurrencyCode, selectDateRangeDays],
    (targetTransactions, appCurrencies, defaultCurrencyCode, days) => {
        const data = [];

        for (const day of days) {
            let total = 0;
            for (const transaction of targetTransactions) {
                const isSameDayTransaction = compareDaysByTimestamp(day.getTime(), transaction.dateTime.seconds * 1000);
                if (isSameDayTransaction) {
                    if (transaction.currencyCode === defaultCurrencyCode) {
                        total += +transaction.amount;
                    } else {
                        const transactionCurrencyData = appCurrencies.find(currency => currency.code === transaction.currencyCode);
                        const conversionRate = transactionCurrencyData[`to${defaultCurrencyCode}`];
                        total += +transaction.amount * conversionRate;
                    }
                }
            }
            const timestampData = {
                date: format(day.getTime(), 'dd/MM'),
                total: total.toFixed(2),
            }
            data.push(timestampData);
        }

        return data;
    },
);

export const selectTransactionsTaxonomiesChartData = type => createSelector(
    [
        selectTransactionsByType(type),
        selectTaxonomyArray(type === 'spending' ? 'spendingCategories' : 'incomeSources'),
        selectAppCurrencies,
        selectDefaultCurrencyCode
    ],
    (targetTransactions, taxonomyArray, appCurrencies, defaultCurrencyCode) => {
        const data = [];
        for (const taxonomy of taxonomyArray) {
            let total = 0;
            for (const transaction of targetTransactions) {
                const isMatchingTaxonomy = type === 'spending'
                    ? transaction.categoryId === taxonomy.id
                    : transaction.sourceId === taxonomy.id;
                if(isMatchingTaxonomy) {
                    if (transaction.currencyCode === defaultCurrencyCode) {
                        total += +transaction.amount;
                    } else {
                        const transactionCurrencyData = appCurrencies.find(currency => currency.code === transaction.currencyCode);
                        const conversionRate = transactionCurrencyData[`to${defaultCurrencyCode}`];
                        total += +transaction.amount * conversionRate;
                    }
                }
            }
            if(total > 0) {
                const taxonomyData = {
                    taxonomyName: taxonomy.name,
                    total: total.toFixed(2),
                }
                data.push(taxonomyData);
            }
        }
        return data;
    }
);