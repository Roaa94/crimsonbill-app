import styled from 'styled-components';
import {borderRadius, colors} from "../../../styles/global";

export const DashboardContentContainer = styled.div`
  border-radius: ${borderRadius.l};
  margin-top: 20px;
  background-color: ${colors.secondaryLight};
  flex-grow: 1;
`;