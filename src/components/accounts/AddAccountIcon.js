import React from 'react';
import {ReactComponent as AddAccountSvgIcon} from '../../assets/svg/add-account-icon.svg';
import styled from 'styled-components';
import {colors} from "../../styles/global";
import {toggleAccountForm} from "../../redux/account-form/account-form.actions";
import {connect} from "react-redux";

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

const AddAccountIcon = ({toggleAccountForm}) => <AddAccountIconWrapper onClick={() => toggleAccountForm(true)}/>;

const mapDispatchToProps = dispatch => ({
    toggleAccountForm: value => dispatch(toggleAccountForm(value)),
});

export default connect(null, mapDispatchToProps)(AddAccountIcon);