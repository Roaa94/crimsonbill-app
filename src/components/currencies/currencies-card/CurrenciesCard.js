import React from 'react';
import {CurrenciesCardContainer} from "./CurrenciesCard.styles";
import {selectAppCurrencies} from "../../../redux/currencies/currencies.selectors";
import {connect} from "react-redux";
import CurrencyListItem from "../currency-list-item/CurrencyListItem";
import {selectUserId} from "../../../redux/user/user.selectors";
import {setDefaultCurrency} from "../../../firebase/currency.firebase-utils";

const CurrenciesCard = ({appCurrencies, userId}) => {

    const handleClick = async (currencyId, selectedCurrencyCode) => {
        const otherCurrencies = appCurrencies.filter(currency => currency.id !== currencyId);
        const otherCurrenciesCodes = otherCurrencies.map(currency => currency.code);
        await setDefaultCurrency(userId, currencyId, selectedCurrencyCode, otherCurrenciesCodes);
    };

    return (
        <CurrenciesCardContainer>
            <h4>Currencies</h4>
            <div className="list">
                {
                    appCurrencies ? (
                        appCurrencies.map(currency => (
                            <CurrencyListItem
                                key={currency.id}
                                {...currency}
                                onClick={handleClick}
                            />
                        ))
                    ) : null
                }
            </div>
        </CurrenciesCardContainer>
    );
};

const mapStateToProps = (state) => ({
    appCurrencies: selectAppCurrencies(state),
    userId: selectUserId(state),
})

export default connect(mapStateToProps)(CurrenciesCard);
