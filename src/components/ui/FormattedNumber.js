import React from 'react';
import NumberFormat from "react-number-format";
import getSymbolFromCurrency from 'currency-symbol-map';

const FormattedNumber = ({number, currencyCode}) => {
    return (
        <NumberFormat
            value={parseFloat(number).toFixed(2)}
            prefix={getSymbolFromCurrency(currencyCode)}
            thousandSeparator={true}
            displayType='text'
        />
    );
};

export default FormattedNumber;
