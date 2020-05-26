import styled from 'styled-components';
import {borderRadius, colors} from "../../../styles/global";

export const DashboardContentContainer = styled.div`
  border-radius: ${borderRadius.l};
  margin-top: 20px;
  background-color: ${colors.secondaryLight};
  flex-grow: 1;
  padding: 10px;  
`;

export const TopContent = styled.div`
  height: 40%;
  position: relative;

  .content-grid {
    height: 100%;
    padding-bottom: 10px;
  }
`;

export const BottomContent = styled.div`
  height: 60%;
`;

export const ActivityChartContainer = styled.div`
  background-color: ${colors.white};
  border-radius: ${borderRadius.m};
  width: 100%;
  height: 100%;
`;

export const SittingGirlSVGContainer = styled.div`
  position: relative;
  height: 100%;
  
  svg {
    display: inline-block;
    position: absolute;
    left: 0;
    bottom: -10px;
    max-height: 100%;
    overflow: visible;
    z-index: 2;
  }
`;