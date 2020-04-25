import React from 'react';
import {ReactComponent as LogoSVG} from '../assets/svg/logo.svg';
import styled from 'styled-components';
import {colors} from "../styles/global";

const LogoWrapper = styled(LogoSVG)`
  width: 30px;
  margin-right: 10px;
  
  .large{
    fill: ${colors.secondary};
  }
  
  .medium{
    fill: ${colors.primary};
  }
  
  .small{
    fill: ${colors.info};
  }
`;

const Logo = () => <LogoWrapper/>;

export default Logo;