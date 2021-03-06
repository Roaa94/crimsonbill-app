import {CurrenciesActionTypes} from "./currencies.action-types";
import {convertCollectionToArray, firestore} from "../../utils/firebase/firebase.utils";

export const fetchCurrenciesStart = () => ({
    type: CurrenciesActionTypes.FETCH_CURRENCIES_START,
});

export const fetchCurrenciesError = errorMessage => ({
    type: CurrenciesActionTypes.FETCH_CURRENCIES_ERROR,
    payload: errorMessage,
});

export const fetchCurrenciesSuccess = currencies => ({
    type: CurrenciesActionTypes.FETCH_CURRENCIES_SUCCESS,
    payload: currencies,
});

export const fetchCurrenciesStartAsync = () => {
  return dispatch => {
      dispatch(fetchCurrenciesStart());
      const currenciesCollectionRef = firestore.collection('currencies');
      currenciesCollectionRef.onSnapshot(currenciesCollectionSnapshot => {
          const currencies = convertCollectionToArray(currenciesCollectionSnapshot);
          // console.log('currencies');
          // console.log(currencies);
          dispatch(fetchCurrenciesSuccess(currencies));
      }, error => dispatch(fetchCurrenciesError(error.message)));
  }
};