import styled from 'styled-components';
import {colors} from "../../../styles/global";

export const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const AvatarContainer = styled.div`
  width: 130px;
  height: 130px;
  border: 2px solid ${colors.secondary};
  border-radius: 100%;
  padding: 7px;
  position: relative;
  
  ::before{
    content: '';
    position: absolute;
    width: 135px;
    height: 135px;
    top: -5px;
    left: -5px;
    border-radius: 100%;
    border: 7px solid ${colors.infoLight};
    z-index: -1;
  }
`;

export const AvatarImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 100%;
`;