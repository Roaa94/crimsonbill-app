import React from 'react';
import NumberFormat from "react-number-format";

//Todo: when default currencies functionality is finished, add the default currencies as default value for the currencies prop
const FormattedNumber = ({number, currency}) => {
    return (
        <NumberFormat
            value={parseFloat(number).toFixed(2)}
            prefix={currency}
            thousandSeparator={true}
            displayType='text'
        />
    );
};

export default FormattedNumber;
