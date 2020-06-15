import React from 'react';
import styled from "styled-components";
import AddAccountIcon from "./AddAccountIcon";
import {pageMargin, pagePadding} from "../../styles/global";

export const AddAccountViewWrapper = styled.div`
  width: 100%;
  transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  height: calc(100vh - ${pageMargin * 2 + pagePadding * 2}px);
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AddAccountView = () => {
    return (
        <AddAccountViewWrapper>
            <AddAccountIcon/>
            <p>Please add an account to get started</p>
        </AddAccountViewWrapper>
    );
};

export default AddAccountView;