import styled from 'styled-components';
import {borderRadius, colors} from "../../../styles/global";
import withStyles from "@material-ui/core/styles/withStyles";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

export const TransactionsListHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 15px;
  background-color: ${colors.background};
  border-radius: ${borderRadius.m};
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 0.9rem;
`;

export const TransactionsListExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: colors.background,
        borderRadius: borderRadius.m,
        fontSize: '0.9rem',
        '&$expanded': {
            minHeight: '48px',
        },
    },
    content: {
      '&$expanded': {
          margin: '5px 0',
      }
    },
    expanded: {}
})(ExpansionPanelSummary)