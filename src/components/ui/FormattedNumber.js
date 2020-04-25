import React from 'react';
import NumberFormat from "react-number-format";

//Todo: when default currency functionality is finished, add the default currency as default value for the currency prop
const FormattedNumber = ({number, currency}) => {
    return (
        <NumberFormat
            value={number.toFixed(2)}
            prefix={currency}
            thousandSeparator={true}
            displayType='text'
        />
    );
};

export default FormattedNumber;
