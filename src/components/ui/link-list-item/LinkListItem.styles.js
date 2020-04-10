import styled from 'styled-components';
import {colors} from "../../../styles/global";

const itemMargin = 20;
const indicatorWidth = 6;
const indicatorHeight = 70;

export const LinkListItemContainer = styled.div`
  padding: 7px;
  margin: 7px ${itemMargin}px;
  display: flex;
  align-items: center;
  border-radius: 15px;
  cursor: pointer;
  position: relative;
  background-color: ${props => props.active ? props.color === 'secondary' ? colors.secondaryLight : colors.infoLight : 'transparent'};
  transition: all .3s;
  
  .icon-container{
      display: flex;
      align-items: center;
      border-radius: 12px;
      padding: 10px;
      margin-right: 10px;
      color: ${props => props.color === 'secondary' ? colors.secondary : colors.primary};
      background-color: ${props => props.active ? 'rgba(255, 255, 255, 0.75)' : 'transparent'};
      transition: all .3s;
  }
  
  :hover {
    background-color: ${props => props.color === 'secondary' ? colors.secondaryLight : colors.infoLight};
    
    .icon-container{
      background-color: rgba(255, 255, 255, 0.75); 
    }
  }
  
  :after{
    transition: all .3s;
    opacity: ${props => props.active ? '1' : '0'};
    content: '';
    position: absolute;
    height: ${indicatorHeight}%;
    width: ${indicatorWidth}px;
    right: -${itemMargin + indicatorWidth / 2}px;
    background-color: ${props => props.color === 'secondary' ? colors.secondary : colors.primary};
    border-radius: ${indicatorWidth / 2}px;
  }
`;