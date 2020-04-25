import React from 'react';
import styled from 'styled-components';
import {colors} from "../../../styles/global";
import {drawerWidth} from "../navigation/Drawer";

const pageMargin = 10;
const pagePadding = 40;

const PageWrapperDiv = styled.div`
  position: relative;
  padding: ${pagePadding / 2}px ${pagePadding}px;
  height: 100%;
  
  ::before{
    content: '';
    border-radius: 30px;
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