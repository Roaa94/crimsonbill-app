import React from 'react';
import {ReactComponent as AddAccountSvgIcon} from '../../assets/svg/add-account-icon.svg';
import styled from 'styled-components';
import {colors} from "../../styles/global";

const AddAccountIconWrapper = styled(AddAccountSvgIcon)`
  width: 100px;
  height: 100px;
  cursor: pointer;
  overflow: visible;
  
  .document{
    fill: ${colors.primary};
  }
  
  .plus{
    fill: ${colors.secondary};
    transition: transform .2s ease-in-out;
    transform-origin: 72% 72%;
  }
  
  :hover {
    .plus{
      transform: scale(1.15);
    }
  }
`;

const AddAccountIcon = ({handleClick}) => <AddAccountIconWrapper onClick={handleClick}/>;

export default AddAccountIcon;