import styled from 'styled-components';
import {borderRadius, colors} from "../../../styles/global";

const pieChartHeight = 200;
const pieChartHeightXl = 350;

const activityChartHeight = 350;
const activityChartHeightXl = 550;

export const DashboardContentContainer = styled.div`
  border-radius: ${borderRadius.l};
  margin-top: 20px;
  background-color: ${colors.secondaryLight};
  padding: 10px;
  
  .chart-card{
      background-color: ${colors.white};
      border-radius: ${borderRadius.m};
      width: 100%;
      padding: 8px;
      
      &.pie-chart {
        margin-bottom: 10px;
        height: ${pieChartHeight}px;
        
        @media (min-width: 1920px) {
          height: ${pieChartHeightXl}px;
        }
      }
      
      &.activity-chart{
        height: ${activityChartHeight}px;
        @media (min-width: 1920px) {
          height: ${activityChartHeightXl}px;
        }
      }
  }
  
  .girl-svg {
    position: relative;
    height: 100%;
    
    svg {
      height: ${pieChartHeight + 30}px;
      max-width: 110%;
      display: inline-block;
      overflow: visible;
      position: absolute;
      bottom: 0;
      z-index: 2;
      
      @media (min-width: 1920px) {
        height: ${pieChartHeightXl + 30}px;
      }
    }
  }
`;