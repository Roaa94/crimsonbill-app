import React from 'react';
import {BalanceCardExpansionPanel, BalanceCardExpansionPanelSummary} from "./BalanceCard.styles";
import Grid from "@material-ui/core/Grid";
import Button from "../../ui/buttons/Button";
import {colors} from "../../../styles/global";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import Box from "@material-ui/core/Box";
import FormattedNumber from "../../ui/FormattedNumber";
import {selectUserId} from "../../../redux/user/user.selectors";
import {connect} from "react-redux";
import {deleteBalanceDocument} from "../../../firebase/balances.firebase-utils";
import BalanceForm from "../BalanceForm";
import TransactionsList from "../../transactions/transactions-list/TransactionsList";
import {selectCurrency} from "../../../redux/currencies/currencies.selectors";
import getSymbolFromCurrency from 'currency-symbol-map';

class BalanceCard extends React.Component {

    _isMount = false;

    componentDidMount() {
        this._isMount = true;
    }

    componentWillUnmount() {
        this._isMount = false;
    }

    state = {
        showBalanceForm: false,
        balanceCardExpanded: false,
    }

    deleteBalance = async () => {
        let {userId, accountId, balanceId} = this.props;
        await deleteBalanceDocument(userId, accountId, balanceId);
    }

    handleExpansionPanelChange = () => {
        let {balanceCardExpanded} = this.state;
        this.setState({
            balanceCardExpanded: !balanceCardExpanded,
        });
        if (!balanceCardExpanded) {
            this.setState({
                showBalanceForm: false,
            });
        }
    }

    controlBalanceForm = value => {
        if(this._isMount) {
            this.setState({
                showBalanceForm: value,
                balanceCardExpanded: true,
            });
        }
    }

    render() {
        let {accountId, balanceId, name, balanceCurrency, totalBalance} = this.props;
        let {showBalanceForm, balanceCardExpanded} = this.state;
        return (
            <BalanceCardExpansionPanel
                expanded={balanceCardExpanded}
                onChange={this.handleExpansionPanelChange}
            >
                <BalanceCardExpansionPanelSummary>
                    <Grid container alignItems='center'>
                        <Grid item xs={4}>
                            <Box fontWeight='600'>
                                {name}
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            {getSymbolFromCurrency(balanceCurrency.code)}
                        </Grid>
                        <Grid item xs={2}>
                            <FormattedNumber number={totalBalance}/>
                        </Grid>
                        <Grid item xs={4} container justify='flex-end'>
                            <Button
                                fullWidth={false}
                                bgColor={colors.secondary}
                                size='small'
                                prefixIcon={<EditRoundedIcon/>}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    this.controlBalanceForm(true);
                                }}
                                margin='0 20px 0 0'
                            >
                                Edit
                            </Button>
                            <Button
                                bgColor={colors.primary}
                                size='small'
                                fullWidth={false}
                                onClick={async (event) => {
                                    event.stopPropagation();
                                    await this.deleteBalance();
                                }}
                                prefixIcon={<DeleteRoundedIcon/>}
                            >
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </BalanceCardExpansionPanelSummary>
                <Box pb={2}>
                    {
                        showBalanceForm ? (
                            <BalanceForm
                                accountId={accountId}
                                balanceId={balanceId}
                                handleFormCancel={() => this.controlBalanceForm(false)}
                            />
                        ) : null
                    }
                    <TransactionsList
                        accountId={accountId}
                        balanceId={balanceId}
                    />
                </Box>
            </BalanceCardExpansionPanel>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    userId: selectUserId(state),
    balanceCurrency: selectCurrency(ownProps.currencyId)(state)
});

export default connect(mapStateToProps)(BalanceCard);
