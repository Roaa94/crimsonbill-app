import React from 'react';
import styled from "styled-components";
import {colors} from "../../styles/global";
import getSymbolFromCurrency from 'currency-symbol-map';

const CurrencyCodeContainer = styled.span`
    font-weight: 700;
    color: ${colors.primary};
    margin-right: 5px;
    display: inline-block;
    width: 20px;
`;


const CurrencyCode = ({currencyCode}) => {
    return (
        <CurrencyCodeContainer>
            {getSymbolFromCurrency(currencyCode)}
        </CurrencyCodeContainer>
    );
};

export default CurrencyCode;
