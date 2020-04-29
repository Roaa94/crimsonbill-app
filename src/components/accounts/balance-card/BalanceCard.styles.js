import {withStyles} from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import {colors} from "../../../styles/global";

export const BalanceCardExpansionPanel = withStyles({
    root: {
        margin: 0,
        boxShadow: 'none',
        borderBottom: `2px solid ${colors.background}`,
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 0,
        },
    },
    expanded: {
        margin: 0,
    },
})(MuiExpansionPanel);

export const BalanceCardExpansionPanelSummary = withStyles({
    root: {
        padding: 0,
        '&$expanded': {
            minHeight: '48px',
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {
        margin: 0,
    }
})(ExpansionPanelSummary);