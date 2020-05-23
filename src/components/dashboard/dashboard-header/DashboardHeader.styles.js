import styled from "styled-components";
import {borderRadius, colors} from "../../../styles/global";

export const DashboardHeaderContainer = styled.div`
  position: relative;
  padding: 15px;
  border-radius: ${borderRadius.m};
  background-color: ${colors.white};
  display: flex;
`;

export const DashboardHeaderSvg = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 25%;
  pointer-events: none;
  
  svg {
    height: 100%;
    width: 100%;
  }
`;