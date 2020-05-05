import React from 'react';
import styled from 'styled-components';
import {borderRadius, colors} from "../../../styles/global";
import {drawerWidth} from "../navigation/Drawer";

const pageMargin = 10;

const PageWrapperDiv = styled.div`
  position: relative;
  padding: 20px 30px 20px 20px;
  height: 100%;
  
  ::before{
    content: '';
    border-radius: ${borderRadius.xl};
    background-color: ${colors.background};
    position: fixed;
    width: calc(100% - ${pageMargin}px - ${drawerWidth}px);
    height: calc(100% - ${pageMargin * 2}px);
    top: ${pageMargin}px;
    right: ${pageMargin}px;
    bottom: ${pageMargin}px;
    left: ${drawerWidth}px;
    z-index: -1;
`;

const PageWrapper = ({children}) => {
    return (
        <PageWrapperDiv>
            {children}
        </PageWrapperDiv>
    );
};

export default PageWrapper;