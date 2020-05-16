import styled from 'styled-components';
import {borderRadius, colors} from "../../../styles/global";

export const CurrencyListItemContainer = styled.div`
  background-color: ${props => props.selected ? colors.background : 'transparent'};
  padding: 10px;
  border-radius: ${borderRadius.m};
  margin-bottom: 5px;
  cursor: pointer;
  transition: all .3s;
  
  :hover {
    background-color: ${colors.background};
  }
  
  .currency-code{
    margin-right: 10px;
    font-weight: 600;
  }
  
  .list-item-end{
    color: ${colors.secondary};
    font-weight: 600;
  }
`;