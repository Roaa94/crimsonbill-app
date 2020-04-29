import React from 'react';
import {BalanceCardExpansionPanel, BalanceCardExpansionPanelSummary} from "./BalanceCard.styles";
import Grid from "@material-ui/core/Grid";
import Button from "../../ui/buttons/button-filled/Button.component";
import {colors} from "../../../styles/global";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import Box from "@material-ui/core/Box";
import FormattedNumber from "../../ui/FormattedNumber";

class BalanceCard extends React.Component {
    render() {
        let {name, currency, totalBalance} = this.props;
        return (
            <BalanceCardExpansionPanel>
                <BalanceCardExpansionPanelSummary>
                    <Grid container alignItems='center'>
                        <Grid item xs={4}>
                            <Box fontWeight='600'>
                                {name}
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            {currency}
                        </Grid>
                        <Grid item xs={2}>
                            <FormattedNumber number={totalBalance}/>
                        </Grid>
                        <Grid item xs={4} container justify='flex-end'>
                            <Button
                                fullWidth={false}
                                bgColor={colors.info}
                                size='small'
                                prefixIcon={<EditRoundedIcon/>}
                                margin='0 20px 0 0'
                            >
                                Edit
                            </Button>
                            <Button
                                bgColor={colors.secondary}
                                size='small'
                                fullWidth={false}
                                prefixIcon={<DeleteRoundedIcon/>}
                            >
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </BalanceCardExpansionPanelSummary>
                <Box pb={2}>
                    bla bla
                </Box>
            </BalanceCardExpansionPanel>
        );
    }
}

export default BalanceCard;
