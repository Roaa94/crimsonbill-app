import styled from 'styled-components';
import {colors} from "../../styles/global";
import {drawerWidth} from "../../components/ui/Drawer";
import {transactionDrawerWidth} from '../../components/transactions-drawer';

const pageBorder = 10;
const pagePadding = 40;

export const DashboardPageWrapper = styled.div`
  position: relative;
  padding: ${pagePadding / 2}px ${pagePadding}px;
  height: 100%;
  
  ::before{
    content: '';
    border-radius: 30px;
    background-color: ${colors.background};
    position: fixed;
    width: ${props => props.drawerOpen ? `calc(100% - ${drawerWidth + transactionDrawerWidth}px)` : `calc(100% - ${pageBorder + drawerWidth}px)`};
    height: calc(100% - ${pageBorder * 2}px);
    top: ${pageBorder}px;
    right: ${props => props.drawerOpen ? `${transactionDrawerWidth}px` : `${pageBorder}px`};
    bottom: ${pageBorder}px;
    left: ${drawerWidth}px;
    z-index: -1;
    transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
   }
   
    .open-drawer-icon-container{
      position: fixed;
      top: 40px;
      right: 10px;
      width: 50px;
      height: 50px;
      box-shadow: -10px 0 10px rgba(0,0,0,0.1);
      border-bottom-left-radius: 20px;
      border-top-left-radius: 20px;
      background-color: #fff;
      color: ${colors.primary};
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
      transform: translateX(${props => props.drawerOpen ? `-${transactionDrawerWidth - pageBorder}px` : 0});
      
      svg {
        width: 30px;
        height: 30px;
      }
    }
`;

export const DashboardPageContent = styled.div`
  height: calc(100% - ${pagePadding * 2}px);
`;

export const AddAccountView = styled.div`
  width: ${props => props.drawerOpen ? `calc(100% - ${transactionDrawerWidth}px)` : '100%'};
  transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  height: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;