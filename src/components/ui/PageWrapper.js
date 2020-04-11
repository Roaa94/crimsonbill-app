import React from 'react';
import styled from 'styled-components';
import {colors} from "../../styles/global";
import {drawerWidth} from "../../components/ui/Drawer";

const pagePadding = 10;

const PageWrapperDiv = styled.div`
  position: relative;
  padding: 20px 40px;
  
  ::before{
    content: '';
    border-radius: 30px;
    background-color: ${colors.background};
    position: fixed;
    width: calc(100% - ${pagePadding}px - ${drawerWidth}px);
    height: calc(100% - ${pagePadding * 2}px);
    top: ${pagePadding}px;
    right: ${pagePadding}px;
    bottom: ${pagePadding}px;
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