import React from 'react';
import {ReactComponent as LogoSVG} from '../assets/svg/logo.svg';
import styled from 'styled-components';
import {colors} from "../styles/global";

const LogoWrapper = styled(LogoSVG)`
  width: 30px;
  margin-right: 10px;
  
  .large{
    fill: ${colors.primary};
  }
  
  .medium{
    fill: ${colors.text};
  }
  
  .small{
    fill: ${colors.secondary};
  }
`;

const Logo = () => <LogoWrapper/>;

export default Logo;