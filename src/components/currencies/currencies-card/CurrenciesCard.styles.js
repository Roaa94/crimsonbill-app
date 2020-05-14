import styled from 'styled-components';
import {borderRadius, colors} from "../../../styles/global";

export const CurrenciesCardContainer = styled.div`
  border-radius: ${borderRadius.m};
  background-color: ${colors.white};
  padding: 20px;
  height: 100%;
  
  h4{
    margin-bottom: 20px;
  }
  
  .list{
      height: ${props => props.listHeight}px;
      overflow-y: scroll;
      overflow-x: hidden;
      margin-bottom: 20px;
  }
`;