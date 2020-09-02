import React from 'react';
import {format} from "date-fns";
import Grid from "@material-ui/core/Grid";
import {
    SpendingArrow,
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
import {deleteTransactionDocument} from "../../../utils/firebase/transactions.firebase-utils";
import FormattedNumber from "../../ui/FormattedNumber";
import TransactionForm from "../transaction-form/TransactionFormContainer";
import {selectTaxonomyValue} from "../../../redux/taxonomies/taxonomies.selectors";
import Icon from "@material-ui/core/Icon";
import {sliceString} from "../../../utils/app.utils";

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
        let {userId, transaction} = this.props;
        let {accountId, balanceId} = transaction;
        await deleteTransactionDocument(userId, accountId, balanceId, transaction.id);
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
        if (this._isMount) {
            this.setState({
                showTransactionForm: value,
                transactionCardExpanded: true,
            });
        }
    }

    render() {
        let {
            transaction,
            readOnly,
            spendingCategory,
            incomeSource,
        } = this.props;

        let {
            id,
            accountId,
            balanceId,
            type,
            title,
            notes,
            amount,
            dateTime,
            currencyCode,
        } = transaction;

        const isSpending = type === 'spending';

        let {transactionCardExpanded, showTransactionForm} = this.state;

        let formattedDate = format(dateTime.seconds * 1000, 'dd/MM');
        let formattedTime = format(dateTime.seconds * 1000, 'hh:mm a');

        return (
            <TransactionExpansionPanel
                expanded={transactionCardExpanded && !readOnly}
                onChange={this.handleExpansionPanelChange}
            >
                <TransactionExpansionPanelSummary>
                    <Grid container alignItems='center' spacing={2} wrap='nowrap'>
                        <Grid item>
                            {
                                isSpending
                                    ? <SpendingArrow><ArrowDown/></SpendingArrow>
                                    : <SpendingArrow><ArrowUp/></SpendingArrow>
                            }
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <FormattedNumber
                                number={amount}
                                negative={isSpending}
                                currencyCode={currencyCode}
                            />
                        </Grid>
                        <Grid container alignItems='center' item xs wrap='nowrap'>
                            <Box mr={1}>
                                <Icon fontSize='small' color={isSpending ? 'primary' : 'secondary'}>
                                    {isSpending ? spendingCategory.icon : incomeSource.icon}
                                </Icon>
                            </Box>
                            <Box fontWeight='600'>
                                {isSpending ? sliceString(spendingCategory.name) : sliceString(incomeSource.name)}
                            </Box>
                        </Grid>
                        <Grid item xs>{sliceString(title)}</Grid>
                        <Grid item xs={12} md={1} container justify='flex-end' spacing={1}>
                            <Grid item>{formattedDate}</Grid>
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
                <Box p={2}>
                    {
                        showTransactionForm && !readOnly ? (
                            <TransactionForm
                                handleFormCancel={() => this.controlTransactionForm(false)}
                                accountId={accountId}
                                balanceId={balanceId}
                                transactionId={id}
                            />
                        ) : null
                    }
                    <Box py={2} fontWeight='600'>
                        {title}
                    </Box>
                    {
                        notes ? notes : null
                    }
                </Box>
            </TransactionExpansionPanel>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    userId: selectUserId(state),
    spendingCategory: selectTaxonomyValue(ownProps.transaction.categoryId, 'spendingCategories')(state),
    incomeSource: selectTaxonomyValue(ownProps.transaction.sourceId, 'incomeSources')(state),
});

export default connect(mapStateToProps)(TransactionCard);
