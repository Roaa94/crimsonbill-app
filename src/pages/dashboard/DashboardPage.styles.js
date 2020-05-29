import styled from 'styled-components';
import {borderRadius, colors, pageMargin, pagePadding} from "../../styles/global";
import {transactionDrawerWidth} from '../../components/transactions/latest-transactions/LatestTransactionsDrawer';

export const DashboardPageWrapper = styled.div`
  position: relative;
  padding: ${pagePadding}px;
  width: ${props => props.drawerOpen ? `calc(100% - ${transactionDrawerWidth}px)` : `calc(100% - ${pageMargin})`};
  border-radius: ${borderRadius.xl};
  background-color: ${colors.background};
  min-height: calc(100% - ${pageMargin * 2}px);
  margin: ${pageMargin}px ${pageMargin}px ${pageMargin}px 0;
  transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  
  .open-drawer-icon-container{
    z-index: 100;
    position: fixed;
    top: 40px;
    right: ${pageMargin}px;
    width: 50px;
    height: 50px;
    box-shadow: -10px 0 10px rgba(0,0,0,0.1);
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
    background-color: #fff;
    color: ${colors.text};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    transform: translateX(${props => props.drawerOpen ? `-${transactionDrawerWidth - pageMargin}px` : 0});
    
    svg {
      width: 30px;
      height: 30px;
      transition: transform .4s cubic-bezier(0, 0, 0.2, 1) 0ms;
      transform: rotate(${props => props.drawerOpen ? '180deg' : '0'});
    }
  }
`;