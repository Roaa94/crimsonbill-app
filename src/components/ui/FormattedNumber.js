import React from 'react';
import NumberFormat from "react-number-format";
import getSymbolFromCurrency from 'currency-symbol-map';
import styled from 'styled-components';
import {colors} from "../../styles/global";

const FormattedNumberWrapper = styled.span`
  color: ${props => props.isNegative ? colors.primary : colors.secondary};
  font-weight: 600;
`;

const FormattedNumber = ({number, currencyCode, negative}) => {
    return (
        <FormattedNumberWrapper isNegative={negative}>
            <NumberFormat
                value={parseFloat(number).toFixed(2)}
                prefix={currencyCode ? getSymbolFromCurrency(currencyCode) : null}
                thousandSeparator={true}
                displayType='text'
            />
        </FormattedNumberWrapper>
    );
};

export default FormattedNumber;
