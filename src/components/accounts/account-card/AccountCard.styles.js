import {withStyles} from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import styled from 'styled-components';
import {borderRadius, boxShadows, colors} from "../../../styles/global";

export const AccountCardExpansionPanel = withStyles({
    root: {
        margin: '30px 0',
        borderRadius: `${borderRadius.l} !important`,
        transition: 'box-shadow .3s',
        '&$expanded': {
            margin: '30px 0 !important',
        },
        '&:hover': {
            boxShadow: boxShadows.main,
        }
    },
    expanded: {},
})(MuiExpansionPanel);

export const AccountCardExpansionPanelHeader = styled.div`
  width: 100%;
  
  .account-currency{
    color: ${colors.secondary};
  }
  
  .account-type{
    color: ${colors.primary};
    font-weight: 600;
    display: flex;
    align-items: center;
    
    svg{
      margin-right: 10px;
    }
  }
`;

export const ExpansionPanelContent = styled.div`
  padding: 0 20px 20px 20px;
`;