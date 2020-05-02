import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import {withStyles} from "@material-ui/core/styles";
import styled from 'styled-components';
import {borderRadius, colors} from "../../../styles/global";

export const TransactionExpansionPanelSummary = withStyles({
    root: {
        minHeight: '30px',
        padding: '0 16px 0 10px',
        fontSize: '0.8rem',
        borderRadius: borderRadius.m,
        transition: 'all .3s',
        '&$expanded': {
            minHeight: '30px',
            backgroundColor: colors.background,
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

export const TransactionAmount = styled.div`
  font-weight: 600;
  color: ${props => props.type === 'spending' ? colors.primary : colors.secondary};
`;