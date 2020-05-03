import React from 'react';
import {format} from "date-fns";
import Grid from "@material-ui/core/Grid";
import {
    SpendingArrow,
    TransactionAmount,
    TransactionExpansionPanel,
    TransactionExpansionPanelSummary
} from "./TransactionCard.styles";
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
import FormattedNumber from "../../ui/FormattedNumber";
import TransactionForm from "../transaction-form/TransactionForm";

class TransactionCard extends React.Component {
    _isMount = false;

    componentDidMount() {
        this._isMount = true;
    }

    componentWillUnmount() {
        this._isMount = false;
    }

    state = {
        showTransactionForm: false,
        transactionCardExpanded: false,
    };

    deleteTransaction = async () => {
        let {userId, accountId, balanceId, transactionId} = this.props;
        await deleteTransactionDocument(userId, accountId, balanceId, transactionId);
    }

    handleExpansionPanelChange = () => {
        let {transactionCardExpanded} = this.state;
        this.setState({
            transactionCardExpanded: !transactionCardExpanded,
        });
        if (!transactionCardExpanded) {
            this.setState({
                showTransactionForm: false,
            });
        }
    }

    controlTransactionForm = value => {
        if(this._isMount) {
            this.setState({
                showTransactionForm: value,
                transactionCardExpanded: true,
            });
        }
    }

    render() {
        let {category, type, title, amount, dateTime, notes, accountId, balanceId, transactionId, readOnly} = this.props;
        let {transactionCardExpanded, showTransactionForm} = this.state;

        let formattedDate = format(dateTime.seconds * 1000, 'dd.MMM');
        let formattedTime = format(dateTime.seconds * 1000, 'hh:mm a');


        return (
            <TransactionExpansionPanel
                expanded={transactionCardExpanded}
                onChange={this.handleExpansionPanelChange}
            >
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
                            <Grid item xs={4}>
                                <TransactionAmount type={type}>
                                    <FormattedNumber number={amount} currency='$'/>
                                </TransactionAmount>
                            </Grid>
                            <Grid item xs>
                                <Box fontWeight='600'>
                                    {category}
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item xs container justify='flex-end' spacing={1}>
                            <Grid item>{formattedDate}</Grid>
                            <Grid item>{formattedTime}</Grid>
                        </Grid>
                        {
                            !readOnly ? (
                                <Grid item xs container justify='flex-end' spacing={1}>
                                    <Button
                                        fullWidth={false}
                                        bgColor={colors.transparent}
                                        textColor={colors.secondary}
                                        size='small'
                                        prefixIcon={<EditRoundedIcon/>}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            this.controlTransactionForm(true);
                                        }}
                                        margin='0 10px 0 0'
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        bgColor={colors.transparent}
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
                            ) : null
                        }
                    </Grid>
                </TransactionExpansionPanelSummary>
                {
                    showTransactionForm && !readOnly ? (
                        <Box px={2} pt={2}>
                            <TransactionForm
                                handleFormCancel={() => this.controlTransactionForm(false)}
                                accountId={accountId}
                                balanceId={balanceId}
                                transactionId={transactionId}
                            />
                        </Box>
                    ) : null
                }
                <Box p={2} fontWeight='600'>
                    {title}
                </Box>
                {
                    notes ? (
                        <Box px={2} pb={2}>
                            {notes}
                        </Box>
                    ) : null
                }
            </TransactionExpansionPanel>
        );
    }
}

const mapStateToProps = (state) => ({
    userId: selectUserId(state),
});

export default connect(mapStateToProps)(TransactionCard);
