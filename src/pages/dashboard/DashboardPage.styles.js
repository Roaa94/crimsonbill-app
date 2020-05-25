import styled from 'styled-components';
import {borderRadius, colors} from "../../styles/global";
import {drawerWidth} from "../../components/ui/navigation/Drawer";
import {transactionDrawerWidth} from '../../components/transactions/latest-transactions/LatestTransactionsDrawer';

const pageMargin = 10;
const pagePadding = 20;

export const DashboardPageWrapper = styled.div`
  position: relative;
  padding: ${pageMargin + pagePadding}px 
           ${props => props.drawerOpen ? pagePadding : pageMargin + pagePadding}px 
           ${pageMargin + pagePadding}px 
           ${pagePadding}px;
  height: 100%;
  
  ::before{
    content: '';
    border-radius: ${borderRadius.xl};
    background-color: ${colors.background};
    position: fixed;
    width: ${props => props.drawerOpen ? `calc(100% - ${drawerWidth + transactionDrawerWidth}px)` : `calc(100% - ${pageMargin + drawerWidth}px)`};
    height: calc(100% - ${pageMargin * 2}px);
    top: ${pageMargin}px;
    right: ${props => props.drawerOpen ? `${transactionDrawerWidth}px` : `${pageMargin}px`};
    bottom: ${pageMargin}px;
    left: ${drawerWidth}px;
    z-index: -1;
    transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
   }
   
    .open-drawer-icon-container{
      z-index: 100;
      position: fixed;
      top: 40px;
      right: 10px;
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

export const DashboardPageContent = styled.div`
  height: 100%;
  width: ${props => props.drawerOpen ? `calc(100% - ${transactionDrawerWidth}px)` : '100%'};
  transition: width .4s cubic-bezier(0, 0, 0.2, 1) 0ms;
  display: flex;
  flex-flow: column;
`;