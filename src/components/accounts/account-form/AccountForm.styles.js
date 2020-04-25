import withStyles from "@material-ui/core/styles/withStyles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import styled from 'styled-components';

export const AccountFormExpansionPanel = withStyles({
    root: {
        margin: '0',
        borderRadius: '15px !important',
        boxShadow: 'none',
        borderBottom: '0 !important',
        transition: 'all .3s',
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: '20px 0 0 0 !important',
        },
        '&:hover': {
            boxShadow: '0 0 15px rgba(0,0,0,0.1)',
        }
    },
    expanded: {},
})(MuiExpansionPanel);

export const AccountFormExpansionPanelSummary = withStyles({
    root: {
        display: 'none',
    },
    expanded: {},
})(MuiExpansionPanelSummary);

export const AccountFormExpansionPanelContent = styled.div`
  padding: 20px;
`;