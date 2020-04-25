import {withStyles} from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import styled from 'styled-components';
import {colors} from "../../../styles/global";

export const AccountCardExpansionPanel = withStyles({
    root: {
        margin: '30px 0',
        borderRadius: '15px !important',
        boxShadow: 'none',
        borderBottom: '0 !important',
        transition: 'box-shadow .3s',
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: '30px 0 !important',
        },
        '&:hover': {
            boxShadow: '0 0 15px rgba(0,0,0,0.1)',
        }
    },
    expanded: {},
})(MuiExpansionPanel);

export const AccountCardExpansionPanelHeader = styled.div`
  padding: 5px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  h3{
    margin: 0 !important;
  }
  
  .account-currency{
    color: ${colors.info};
  }
  
  .account-type{
    color: ${colors.secondary};
    font-weight: 400;
    display: flex;
    align-items: center;
    
    svg{
      margin-right: 10px;
    }
  }
`;

export const ExpansionPanelContent = styled.div`
  padding: 20px;
`;