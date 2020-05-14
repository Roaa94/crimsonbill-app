import React from 'react';
import NumberFormat from "react-number-format";
import getSymbolFromCurrency from 'currency-symbol-map';
import {selectCurrencyCode} from "../../redux/currencies/currencies.selectors";
import {connect} from "react-redux";

const FormattedNumber = ({number, currencyCode}) => {
    return (
        <NumberFormat
            value={parseFloat(number).toFixed(2)}
            prefix={currencyCode ? getSymbolFromCurrency(currencyCode) : null}
            thousandSeparator={true}
            displayType='text'
        />
    );
};

const mapStateToProps = (state, ownProps) => ({
   currencyCode: selectCurrencyCode(ownProps.currencyId)(state),
});

export default connect(mapStateToProps)(FormattedNumber);
