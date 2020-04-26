import styled from 'styled-components';
import withStyles from "@material-ui/core/styles/withStyles";
import Menu from "@material-ui/core/Menu";
import {boxShadows} from "../../../../styles/global";

export const DropDownWrapper = styled.div`
  //display: inline-block;
`;

export const DropDownMenu = withStyles({
    paper: {
        borderRadius: '10px',
        boxShadow: boxShadows.main,
    }
})(Menu);