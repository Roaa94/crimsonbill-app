import React from 'react';
import {format} from "date-fns";
import {ExpansionPanel} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {SpendingArrow, TransactionAmount, TransactionExpansionPanelSummary} from "./TransactionCard.styles";
import {ReactComponent as ArrowUp} from '../../../assets/svg/arrow-up.svg';
import {ReactComponent as ArrowDown} from '../../../assets/svg/arrow-down.svg';
import Box from "@material-ui/core/Box";
import Button from "../../ui/buttons/Button";
import {colors} from "../../../styles/global";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import {selectUserId} from "../../../redux/user/user.selectors";
import {connect} from "react-redux";
import {deleteTransactionDocument} from "../../../firebase/transactions.firebase-utils";

class TransactionCard extends React.Component {

    deleteTransaction = async () => {
        let {userId, accountId, balanceId, transactionId} = this.props;
        await deleteTransactionDocument(userId, accountId, balanceId, transactionId);
    }

    render() {
        let {category, type, amount, dateTime} = this.props;

        let parsedDateTime = new Date(dateTime.seconds * 1000);
        let formattedDate = format(parsedDateTime, 'dd.MMM');
        let formattedTime = format(parsedDateTime, 'hh:mm a');


        return (
            <ExpansionPanel>
                <TransactionExpansionPanelSummary>
                    <Grid container alignItems='center' spacing={2}>
                        <Grid item container xs spacing={1}>
                            <Grid item>
                                {
                                    type === 'spending'
                                        ? <SpendingArrow><ArrowDown/></SpendingArrow>
                                        : <SpendingArrow><ArrowUp/></SpendingArrow>
                                }
                            </Grid>
                            <Grid item xs={3}>
                                <TransactionAmount type={type}>
                                    {amount}
                                </TransactionAmount>
                            </Grid>
                            <Grid item xs>
                                <Box fontWeight='600'>
                                    Category{category}
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item xs container justify='flex-end' spacing={1}>
                            <Grid item>{formattedDate}</Grid>
                            <Grid item>{formattedTime}</Grid>
                        </Grid>
                        <Grid item xs container justify='flex-end' spacing={1}>
                            <Button
                                fullWidth={false}
                                bgColor={colors.white}
                                textColor={colors.secondary}
                                size='small'
                                prefixIcon={<EditRoundedIcon/>}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    this.setState({
                                        // showTransactionForm: true,
                                        // transactionCardExpanded: true,
                                    });
                                }}
                                margin='0 10px 0 0'
                            >
                                Edit
                            </Button>
                            <Button
                                bgColor={colors.white}
                                textColor={colors.primary}
                                size='small'
                                fullWidth={false}
                                onClick={async (event) => {
                                    event.stopPropagation();
                                    await this.deleteTransaction();
                                }}
                                prefixIcon={<DeleteRoundedIcon/>}
                            >
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </TransactionExpansionPanelSummary>
            </ExpansionPanel>
        );
    }
}

const mapStateToProps = (state) => ({
    userId: selectUserId(state),
});

export default connect(mapStateToProps)(TransactionCard);
