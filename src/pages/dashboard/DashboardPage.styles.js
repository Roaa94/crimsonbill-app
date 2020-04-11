import styled from 'styled-components';
import {colors} from "../../styles/global";
import {drawerWidth} from "../../components/ui/Drawer";
import {transactionDrawerWidth} from '../../components/transactions-drawer';

const pagePadding = 10;

export const DashboardPageWrapper = styled.div`
  position: relative;
  padding: 20px 40px;
  
  ::before{
    content: '';
    border-radius: 30px;
    background-color: ${colors.background};
    position: fixed;
    width: ${props => props.drawerOpen ? `calc(100% - ${drawerWidth + transactionDrawerWidth}px)` : `calc(100% - ${pagePadding + drawerWidth}px)`};
    height: calc(100% - ${pagePadding * 2}px);
    top: ${pagePadding}px;
    right: ${props => props.drawerOpen ? `${transactionDrawerWidth}px` : `${pagePadding}px`};
    bottom: ${pagePadding}px;
    left: ${drawerWidth}px;
    z-index: -1;
    transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
   }
   
    .open-drawer-icon-container{
      position: absolute;
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
      transform: translateX(${props => props.drawerOpen ? `-${transactionDrawerWidth - pagePadding}px` : 0});
      
      svg {
        width: 30px;
        height: 30px;
      }
    }
`;