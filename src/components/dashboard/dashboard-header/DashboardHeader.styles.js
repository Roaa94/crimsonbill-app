import styled from "styled-components";
import {borderRadius, colors} from "../../../styles/global";

export const DashboardHeaderContainer = styled.div`
  position: relative;
  padding: 15px;
  border-radius: ${borderRadius.l};
  background-color: ${colors.white};
`;

export const DashboardHeaderSvg = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  height: 140%;
  pointer-events: none;
  
  svg {
    height: 100%;
    display: block;
    position: absolute;
    right: 0;
  }
`;