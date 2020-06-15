import React from 'react';
import {ReactComponent as AddAccountSvgIcon} from '../../assets/svg/add-account-icon.svg';
import styled from 'styled-components';
import {colors} from "../../styles/global";
import {connect} from "react-redux";
import {toggleAccountForm} from "../../redux/accounts/accounts.actions";
import {useHistory} from "react-router-dom";

const AddAccountIconWrapper = styled(AddAccountSvgIcon)`
  width: 100px;
  height: 100px;
  cursor: pointer;
  overflow: visible;
  
  .document{
    fill: ${colors.text};
  }
  
  .plus{
    fill: ${colors.primary};
    transition: transform .2s ease-in-out;
    transform-origin: 72% 72%;
  }
  
  :hover {
    .plus{
      transform: scale(1.15);
    }
  }
`;

const AddAccountIcon = ({toggleAccountForm}) => {
    const history = useHistory();

    const handleClick = () => {
        history.push('/home/accounts');
        toggleAccountForm(true);
    }

    return (
        <AddAccountIconWrapper
            onClick={handleClick}
        />
    );
};

const mapDispatchToProps = dispatch => ({
    toggleAccountForm: value => dispatch(toggleAccountForm(value)),
});

export default connect(null, mapDispatchToProps)(AddAccountIcon);