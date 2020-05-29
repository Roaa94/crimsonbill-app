import styled from 'styled-components';
import {borderRadius, colors} from "../../../styles/global";

const gutter = 20;
const headerHeight = 60;

export const LatestTransactionsContainer = styled.div`
  height: 100%;
  max-height: 100%;
  overflow:hidden;
`;

export const LatestTransactionsListContainer = styled.div`
  height: 50%;
  max-height: 50%;
`;

export const LatestTransactionsListContent = styled.div`
  padding: 0 ${gutter /2}px;
  margin: 0 ${gutter /2}px;
  max-height: calc(100% - ${gutter * 2 + headerHeight}px);
  height: calc(100% - ${gutter * 2 + headerHeight}px);
  overflow-x: hidden;
  overflow-y: scroll;
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
      background-color: ${props => props.isSpending ? colors.primaryLight : colors.secondaryLight};
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
      background-color: ${props => props.isSpending ? colors.primary : colors.secondary};
  }
`;


export const LatestTransactionsListItemContainer = styled.div`
  margin-bottom: ${gutter}px;
  font-size: 0.9rem;
`;


export const LatestTransactionsListHeader = styled.div`
  padding: ${gutter}px;
  height: ${gutter * 2 + headerHeight}px;
  width: 100%;

  div {
    padding: 0 ${gutter}px;
    height: 50px;
    display: flex;
    align-items: center;
    font-weight: 600;
    border-radius: ${borderRadius.m};
    background-color: ${props => props.isSpending ? colors.primaryLight : colors.secondaryLight};
  }
`;
