import React from 'react';
import NumberFormat from "react-number-format";
import getSymbolFromCurrency from 'currency-symbol-map';
import styled from 'styled-components';
import {colors} from "../../styles/global";

const FormattedNumberWrapper = styled.span`
  color: ${props => props.isNegative ? colors.primary : colors.secondary};
  font-weight: ${props => props.fontWeight ? props.fontWeight : 600};
  font-size: ${props => props.fontSize ? props.fontSize : 1}rem;
`;

const FormattedNumber = ({number, fontSize, fontWeight, currencyCode, negative}) => {
    return (
        <FormattedNumberWrapper
            fontSize={fontSize}
            fontWeight={fontWeight}
            isNegative={negative}
        >
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
