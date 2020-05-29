import React from 'react';
import styled from 'styled-components';
import {borderRadius, colors} from "../../../styles/global";

const pageMargin = 10;

const PageWrapperDiv = styled.div`
  padding: 20px 30px 20px 20px;
  min-height: 100%;
  border-radius: ${borderRadius.xl};
  background-color: ${colors.background};
  margin: ${pageMargin}px ${pageMargin}px ${pageMargin}px 0; 
`;

const PageWrapper = ({children}) => {
    return (
        <PageWrapperDiv>
            {children}
        </PageWrapperDiv>
    );
};

export default PageWrapper;