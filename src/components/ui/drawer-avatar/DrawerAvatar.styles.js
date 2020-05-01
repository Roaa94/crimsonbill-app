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
  border: 2px solid ${colors.primary};
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
    border: 7px solid ${colors.secondaryLight};
    z-index: -1;
  }
  
  .edit-icon{
    opacity: 0;
    transition: opacity .3s;
    position: absolute;
    bottom: -12.5px;
    right: 50px;
    width: 25px;
    height: 25px;
    border-radius: 100%;
    color: ${colors.primary};
    background-color: #fff;
    border: 2px solid ${colors.text};
    z-index: 10;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg{
        width: 15px;
        height: 15px;
    }
  }
  
  :hover {
    .edit-icon{
      opacity: 1;
    }
  }
`;

export const AvatarImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 100%;
  cursor: pointer;
  height: 100%;
  
  img{
    object-fit: cover;
    height: 100%;
  }
`;

export const LoaderWrapper = styled.div`
  border-radius: 100%;
  background-color: ${colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  
  svg{
      width: 60%;
      height: 60%;
  }
`;