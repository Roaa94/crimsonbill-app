import styled from 'styled-components';
import {borderRadius, colors} from "../../../styles/global";

export const TransactionsListHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 15px;
  background-color: ${colors.background};
  border-radius: ${borderRadius.m};
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 0.9rem;
`;