import styled from 'styled-components';
import {borderRadius, boxShadows, colors} from "../../../styles/global";

const itemMargin = 20;
const indicatorWidth = 6;
const indicatorHeight = 70;

export const LinkListItemContainer = styled.div`
  padding: 7px;
  margin: 7px ${itemMargin}px;
  display: flex;
  align-items: center;
  border-radius: ${borderRadius.l};
  cursor: pointer;
  position: relative;
  background-color: ${props => props.active ? props.color === 'secondary' ? colors.primaryLight : colors.secondaryLight : 'transparent'};
  transition: all .3s;
  
  .icon-container{
      display: flex;
      align-items: center;
      border-radius: ${borderRadius.m};
      padding: 10px;
      margin-right: 10px;
      color: ${props => props.color === 'secondary' ? colors.primary : colors.text};
      background-color: ${props => props.active ? colors.white75 : 'transparent'};
      transition: all .3s;
      box-shadow: ${props => props.active ? boxShadows.light : 'none'};
  }
  
  :hover {
    background-color: ${props => props.color === 'secondary' ? colors.primaryLight : colors.secondaryLight};
    
    .icon-container{
      background-color: ${colors.white75}; 
      box-shadow: ${boxShadows.light};
    }
  }
  
  ::after{
    transition: all .3s;
    opacity: ${props => props.active ? '1' : '0'};
    content: '';
    position: absolute;
    height: ${indicatorHeight}%;
    width: ${indicatorWidth}px;
    right: -${itemMargin + indicatorWidth / 2}px;
    background-color: ${props => props.color === 'secondary' ? colors.primary : colors.text};
    border-radius: ${indicatorWidth / 2}px;
  }
`;