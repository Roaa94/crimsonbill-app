import React from 'react';
import {useMediaQuery} from "@material-ui/core";

import styled from 'styled-components';
import DoubleArrowRoundedIcon from "@material-ui/icons/DoubleArrowRounded";

const ResponsiveArrowWrapper = styled.div`
  transform-origin: 50% 50%;
  transform: ${
    props => props.smallDevice
        ? 'rotate(90deg)' : 'rotate(0)'
};
`;

const ResponsiveArrow = () => {

    const smallDevice = useMediaQuery(theme => theme.breakpoints.down('md'));

    return (
        <ResponsiveArrowWrapper
            smallDevice={smallDevice}
        >
            <DoubleArrowRoundedIcon
                color='secondary'
                fontSize={smallDevice ? 'default' : 'large'}
            />
        </ResponsiveArrowWrapper>
    );
};

export default ResponsiveArrow;
