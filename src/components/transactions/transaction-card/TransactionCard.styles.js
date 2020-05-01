import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import {withStyles} from "@material-ui/core/styles";
import styled from 'styled-components';
import {colors} from "../../../styles/global";

export const TransactionExpansionPanelSummary = withStyles({
    root: {
        minHeight: '40px',
        padding: 0,
        fontSize: '0.8rem',
        '&$expanded': {
            minHeight: '40px',
        },
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