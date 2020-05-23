import styled from "styled-components";
import {borderRadius, boxShadows, colors} from "../../../styles/global";

export const DashboardHeaderBalanceContainer = styled.div`
  box-shadow: ${boxShadows.main};
  border-radius: ${borderRadius.m};
  background: linear-gradient(${colors.background}, ${colors.white});
  padding: 30px 20px;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 150px;
`;

export const BalanceLine = styled.div`
  background-color: ${colors.secondary};
  margin: 15px 0;
  width: 10%;
  height: 6px;
  border-radius: ${borderRadius.xs};
`;

export const BalanceText = styled.div`
  font-size: 0.9rem;
`;