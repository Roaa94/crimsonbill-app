import {withStyles} from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import {colors} from "../../../styles/global";

export const BalanceCardExpansionPanel = withStyles({
    root: {
        borderBottom: `2px solid ${colors.background}`,
    },
})(MuiExpansionPanel);

export const BalanceCardExpansionPanelSummary = withStyles({
    root: {
        padding: 0,
        '&$expanded': {
            minHeight: '48px',
        },
    },
    expanded: {
        margin: 0,
    }
})(ExpansionPanelSummary);