import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "../../ui/buttons/Button";
import {colors} from "../../../styles/global";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import {
    addTransactionDocument,
    updateTransactionDocument
} from "../../../firebase/transactions.firebase-utils";
import {selectUserId} from "../../../redux/user/user.selectors";
import {connect} from "react-redux";
import TransactionForm from "./TransactionForm";
import {TransactionFormWrapper} from "./TransactionForm.styles";
import {selectTransaction} from "../../../redux/transactions/transactions.selectors";

class TransactionFormContainer extends React.Component {
    defaultTransactionValues = {
        type: 'spending',
        categoryId: null,
        sourceId: null,
        title: '',
        amount: '',
        dateTime: new Date(),
        notes: '',
    };

    typePickerValues = {
        spending: true,
        earning: false,
    };

    state = {
        defaultValues: this.defaultTransactionValues,
        typePickerValues: this.typePickerValues,
    };

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        const {transaction} = this.props;

        if (transaction) {
            const parsedDateTime = new Date(transaction.dateTime.seconds * 1000);
            let {type, categoryId, sourceId, title, amount, notes} = transaction;
            if (this._isMounted) {
                this.setState({
                    defaultValues: {
                        dateTime: parsedDateTime,
                        type,
                        categoryId,
                        sourceId,
                        title,
                        amount,
                        notes,
                    },
                    typePickerValues: {
                        spending: transaction.type === 'spending',
                        earning: transaction.type === 'earning',
                    },
                });
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleFormSubmit = async event => {
        event.preventDefault();
        let {handleFormCancel, userId, accountId, transactionId, balanceId} = this.props;
        const transactionData = this.state.defaultValues;
        if (transactionId && accountId && balanceId) {
            await updateTransactionDocument(userId, accountId, balanceId, transactionId, transactionData);
        } else {
            await addTransactionDocument(userId, accountId, balanceId, transactionData);
        }
        if (this._isMounted) {
            this.setState({
                defaultValues: this.defaultTransactionValues,
                typePickerValues: this.typePickerValues,
            });
        }
        handleFormCancel();
    }

    handleInputChange = (name, value) => {
        const {defaultValues} = this.state;

        this.setState({
            defaultValues: {
                ...defaultValues,
                [name]: value,
            }
        });

        if (name === 'type') {
            this.setState({
                typePickerValues: {
                    [value]: true,
                }
            })
        }
    }

    render() {
        const {typePickerValues, defaultValues} = this.state;

        const {handleFormCancel, transactionId} = this.props;

        return (
            <TransactionFormWrapper>
                <form onSubmit={this.handleFormSubmit}>
                    <TransactionForm
                        values={defaultValues}
                        typePickers={typePickerValues}
                        onInputChange={this.handleInputChange}
                        toEdit={!!transactionId}
                    />
                    <Grid container>
                        <Button
                            fullWidth={false}
                            type='submit'
                            bgColor={colors.secondary}
                            prefixIcon={<CheckRoundedIcon/>}
                            margin='0 20px 0 0'
                        >
                            Submit
                        </Button>
                        <Button
                            bgColor={colors.primary}
                            fullWidth={false}
                            onClick={handleFormCancel}
                            prefixIcon={<ClearRoundedIcon/>}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </form>
            </TransactionFormWrapper>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    userId: selectUserId(state),
    transaction: selectTransaction(ownProps.transactionId)(state),
});

export default connect(mapStateToProps)(TransactionFormContainer);
