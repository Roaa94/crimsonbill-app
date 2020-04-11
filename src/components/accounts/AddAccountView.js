import React from 'react';
import styled from "styled-components";
import {transactionDrawerWidth} from "../transactions-drawer";
import AddAccountIcon from "./AddAccountIcon";
import {useHistory} from 'react-router-dom';

export const AddAccountViewWrapper = styled.div`
  width: ${props => props.drawerOpen ? `calc(100% - ${transactionDrawerWidth}px)` : '100%'};
  transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  height: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AddAccountView = ({drawerOpen = false}) => {
    const history = useHistory();

    return (
        <AddAccountViewWrapper drawerOpen={drawerOpen}>
            <AddAccountIcon handleClick={() => history.push('home/add-account')}/>
            <p>Please add an account to get started</p>
        </AddAccountViewWrapper>
    );
};

export default AddAccountView;