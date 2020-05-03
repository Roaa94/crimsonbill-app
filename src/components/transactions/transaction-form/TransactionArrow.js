import React from 'react';
import {useMediaQuery} from "@material-ui/core";

import styled from 'styled-components';
import DoubleArrowRoundedIcon from "@material-ui/icons/DoubleArrowRounded";

const TransactionArrowWrapper = styled.div`
  transform-origin: 50% 50%;
  transform: ${
    props => props.smallDevice
        ? props => props.spending ? 'rotate(90deg)' : 'rotate(270deg)'
        : props => props.spending ? 'rotate(0)' : 'rotate(180deg)'
};
`;

const TransactionArrow = ({isSpending}) => {

    const smallDevice = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <TransactionArrowWrapper
            smallDevice={smallDevice}
            spending={isSpending}
        >
            <DoubleArrowRoundedIcon
                color={isSpending ? 'primary' : 'secondary'}
                fontSize={smallDevice ? 'default' : 'large'}
            />
        </TransactionArrowWrapper>
    );
};

export default TransactionArrow;
