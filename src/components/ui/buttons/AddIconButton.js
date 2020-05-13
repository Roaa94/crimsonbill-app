import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import {borderRadius, boxShadows, colors} from "../../../styles/global";

const AddIconButtonContainer = styled.div`
  color: ${props => props.color};
  padding: ${props => props.size === 'small' ? '5px' : '10px'};
  width: ${props => props.size === 'small' ? '30px' : '50px'};
  height: ${props => props.size === 'small' ? '30px' : '50px'};
  margin: ${props => props.dense ? 0 : '0 20px'};
  border-radius: ${props => props.size === 'small' ? borderRadius.s : borderRadius.m};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
  transition: all .3s;
  pointer-events: ${props => props.disabled ? 'none' : 'all'};
  background-color: ${props => props.bgcolor};
    
  :hover{
    box-shadow: ${boxShadows.main};
  }
  
  svg {
    width: ${props => props.size === 'small' ? '20px' : '30px'};
  }
`;

const AddIconButton = (
    {
        handleClick,
        dense = false,
        disabled = false,
        size,
        bgColor = colors.white,
        color = colors.text,
        ...otherProps
    }
) => {
    return (
        <AddIconButtonContainer
            onClick={handleClick}
            disabled={disabled}
            size={size}
            dense={dense}
            bgcolor={bgColor}
            color={color}
            {...otherProps}
        >
            <AddIcon/>
        </AddIconButtonContainer>
    );
};

export default AddIconButton;
