import styled from 'styled-components';
import {borderRadius, colors} from "../../styles/global";

export const ChartCard = styled.div`
  background-color: ${colors.white};
  border-radius: ${borderRadius.l};
  height: ${props => props.height ? props.height : 350}px;
  padding: 20px;
`;