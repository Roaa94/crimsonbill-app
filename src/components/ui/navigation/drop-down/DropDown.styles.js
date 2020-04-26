import styled from 'styled-components';
import withStyles from "@material-ui/core/styles/withStyles";
import Menu from "@material-ui/core/Menu";
import {borderRadius, boxShadows} from "../../../../styles/global";

export const DropDownWrapper = styled.div`
  //display: inline-block;
`;

export const DropDownMenu = withStyles({
    paper: {
        borderRadius: borderRadius.m,
        boxShadow: boxShadows.main,
    }
})(Menu);