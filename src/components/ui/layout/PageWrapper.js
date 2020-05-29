import React from 'react';
import styled from 'styled-components';
import {borderRadius, colors, pageMargin, pagePadding} from "../../../styles/global";

const PageWrapperDiv = styled.div`
  padding: ${pagePadding}px;
  min-height: calc(100% - 20px);
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