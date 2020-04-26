import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import {boxShadows, colors} from "../../../styles/global";

const AddIconButtonContainer = styled.div`
  color: ${colors.primary};
  padding: 10px;
  width: 50px;
  height: 50px;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
  transition: all .3s;
  pointer-events: ${props => props.disabled ? 'none' : 'all'};
  
  :hover{
    color: ${colors.info};
    box-shadow: ${boxShadows.main};
  }
  
  svg {
    width: 30px;
  }
`;

const AddIconButton = ({handleClick, disabled = false}) => {
    return (
        <AddIconButtonContainer onClick={handleClick} disabled={disabled}>
            <AddIcon/>
        </AddIconButtonContainer>
    );
};

export default AddIconButton;
