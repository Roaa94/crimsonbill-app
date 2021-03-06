import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import {withStyles} from "@material-ui/core/styles";
import styled from 'styled-components';
import {borderRadius, colors} from "../../../styles/global";
import {ExpansionPanel} from "@material-ui/core";

export const TransactionExpansionPanel = withStyles({
    root: {
        borderRadius: borderRadius.m,
        margin: '5px 0',
        transition: 'background-color .3s',
        '&:first-child': {
            marginTop: 0,
        },
        '&$expanded': {
            backgroundColor: colors.background,
            margin: '5px 0',
            '&:first-child': {
                marginTop: 0,
            }
        }
    },
    expanded: {},
})(ExpansionPanel);

export const TransactionExpansionPanelSummary = withStyles({
    root: {
        minHeight: '30px',
        borderRadius: borderRadius.m,
        padding: '0 16px 0 10px',
        fontSize: '0.8rem',
        '&$expanded': {
            minHeight: '30px',
            backgroundColor: colors.background,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderBottom: `2px solid ${colors.disabledBackground}`
        },
        '&:hover': {
            backgroundColor: colors.background,
        }
    },
    content: {
        margin: '8px 0',
        '&$expanded': {
            margin: '8px 0',
        }
    },
    expanded: {
        margin: 0,
    }
})(ExpansionPanelSummary);

export const SpendingArrow = styled.div`
  svg {
    width: 15px;
    height: 15px;
  }
`;