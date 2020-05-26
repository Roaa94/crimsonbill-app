import styled from "styled-components";
import {borderRadius, boxShadows, colors} from "../../../../styles/global";

export const VerticalTabsContainer = styled.div`
  height: 100%;
  display: flex;
  flex-grow: 1;
`;

export const TabsContainer = styled.div`
  width: 20%;
  height: 100%;
  padding: 8px 10px 8px 8px;
  background-color: ${colors.primaryLight};
  border-radius: ${borderRadius.m};
`;

export const Tab = styled.div`
  height: 50%;
  background-color: ${props => props.current ? colors.white75 : 'none'};
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.8rem;
  font-weight: ${props => props.current ? '600' : 'inherit'};
  color: ${props => props.current ? colors.primary : 'inherit'};
  border-radius: ${borderRadius.m};
  transition: all .5s;
  box-shadow: ${props => props.current ? boxShadows.main : 'none'};
`;

export const TabContentContainer = styled.div`
  padding: 15px;
  flex-grow: 1;
`;