import React from 'react';
import styled from 'styled-components';
import {borderRadius, boxShadows, colors} from "../../styles/global";
import {ReactComponent as ArrowUpIcon} from '../../assets/svg/arrow-up.svg';
import {ReactComponent as ArrowDownIcon} from '../../assets/svg/arrow-down.svg';

const TransactionTypeIconContainer = styled.div`
  background-color: ${props => props.disabled ? colors.white : colors.background};
  width: 50px;
  height: 100%;
  margin-right: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  border-radius: ${borderRadius.m};
  border: ${props => props.checked ? `3px solid ${props.type === 'spending' ? colors.primary : colors.secondary}` : 'none'};
  transition: all .3s;
  pointer-events: ${props => props.disabled ? 'none' : 'all'};
  box-shadow: ${props => props.checked || props.disabled ? boxShadows.main : 'none'};
  
  :hover {
    box-shadow: ${boxShadows.main};
  }
  
  svg {
    width: 25px;
    height: 25px;
  }
`;

const TransactionTypeIcon = ({type, disabled, checked, ...otherProps}) => {
    return (
        <TransactionTypeIconContainer
            type={type}
            checked={checked}
            disabled={disabled}
            {...otherProps}
        >
            {
                type === 'spending' ? <ArrowDownIcon/> : <ArrowUpIcon/>
            }
        </TransactionTypeIconContainer>
    );
};

export default TransactionTypeIcon;
