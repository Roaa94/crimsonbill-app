import {withStyles} from "@material-ui/core/styles";
import {borderRadius, boxShadows} from "../../styles/global";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import styled from 'styled-components';

export const FiltersExpansionPanel = withStyles({
    root: {
        margin: 0,
        borderRadius: `${borderRadius.l} !important`,
        transition: 'box-shadow .3s',
        '&$expanded': {
            margin: 0,
        },
        '&:hover': {
            boxShadow: boxShadows.main,
        }
    },
    expanded: {},
})(MuiExpansionPanel);

export const FiltersExpansionPanelSummary = withStyles({
    root: {
        paddingTop: 0,
        paddingBottom: 0,
        minHeight: '55px',
        '&$expanded': {
            minHeight: '55px',
        },
    },
    expanded: {
        marginTop: 0,
        marginBottom: 0,
    }
})(ExpansionPanelSummary);

export const FiltersCardContent = styled.div`
  padding: 0 20px 20px 20px;
`;