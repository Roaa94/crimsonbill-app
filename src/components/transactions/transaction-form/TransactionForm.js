import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "../../ui/buttons/Button";
import {colors} from "../../../styles/global";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import {categories} from "../../../data";
import {addOrUpdateTransactionDocument} from "../../../firebase/transactions.firebase-utils";
import {createStructuredSelector} from "reselect";
import {selectUserId} from "../../../redux/user/user.selectors";
import {connect} from "react-redux";
import TransactionFormLayout from "./TransactionFormLayout";
import {firestore} from "../../../firebase/firebase.utils";

class TransactionForm extends React.Component {
    defaultTransactionValues = {
        type: 'spending',
        category: '',
        amount: '',
        dateTime: new Date(),
        accountToAccount: false,
        sourceAccountId: '',
        destinationAccountId: '',
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
        const {userId, accountId, balanceId, transactionId} = this.props;

        if (transactionId) {
            const accountPath = `users/${userId}/accounts/${accountId}`;
            const balancePath = `${accountPath}/balances/${balanceId}`;
            const transactionDocPath = `${balanceId ? balancePath : accountPath}/transactions/${transactionId}`;
            const transactionRef = firestore.doc(transactionDocPath);

            transactionRef.onSnapshot(snapShot => {
                let transactionData = snapShot.data();
                let {type, category, amount, accountToAccount, sourceAccountId, destinationAccountId, notes} = transactionData;
                const parsedDateTime = new Date(transactionData.dateTime.seconds * 1000);

                if (this._isMounted) {
                    this.setState({
                        defaultValues: {
                            dateTime: parsedDateTime,
                            type, category, amount, accountToAccount, sourceAccountId, destinationAccountId, notes,
                        },
                        typePickerValues: {
                            spending: transactionData.type === 'spending',
                            earning: transactionData.type === 'earning',
                        }
                    });
                }
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleFormSubmit = async event => {
        event.preventDefault();
        let {handleFormCancel, userId, accountId, transactionId, balanceId} = this.props;
        const transactionData = this.state.defaultValues;
        await addOrUpdateTransactionDocument(userId, accountId, balanceId, transactionId, transactionData);
        this.setState({
            defaultValues: this.defaultTransactionValues,
            typePickerValues: this.typePickerValues,
        });
        handleFormCancel();
    }

    handleFieldChange = event => {
        const {defaultValues} = this.state;
        const {name, value} = event.target;
        this.setState({
            defaultValues: {
                ...defaultValues,
                [name]: value
            },
        });
    };

    handleTypePickerChange = value => {
        const {defaultValues} = this.state;
        this.setState({
            defaultValues: {
                ...defaultValues,
                type: value,
            },
            typePickerValues: {
                [value]: true,
            }
        })
    };

    handleDateTimeChange = pickedDate => {
        console.log(pickedDate);
        const {defaultValues} = this.state;
        this.setState({
            defaultValues: {
                ...defaultValues,
                dateTime: pickedDate,
            }
        });
    }

    handleCheckBoxChange = event => {
        const {defaultValues} = this.state;
        this.setState({
            defaultValues: {
                ...defaultValues,
                accountToAccount: event.target.checked,
            }
        })
    }

    render() {
        const {typePickerValues, defaultValues} = this.state;
        const {category, amount, dateTime, accountToAccount, notes, type} = defaultValues;
        const {handleFormCancel, transactionId} = this.props;

        return (
            <form onSubmit={this.handleFormSubmit}>
                <TransactionFormLayout
                    formTitle={transactionId ? 'Edit Transaction' : 'Add Transaction'}
                    typePickers={typePickerValues}
                    onSelectType={this.handleTypePickerChange}
                    onFieldChange={this.handleFieldChange}
                    categorySelectValue={category}
                    categorySelectItems={categories}
                    amountValue={amount}
                    dateTimeValue={dateTime}
                    onDateTimeChange={this.handleDateTimeChange}
                    accountToAccount={accountToAccount}
                    onCheckboxChange={this.handleCheckBoxChange}
                    type={type}
                    fromAccountSelectValue={category}
                    toAccountSelectValue={category}
                    accountList={categories}
                    notesValue={notes}
                />
                <Grid container>
                    <Button
                        fullWidth={false}
                        type='submit'
                        bgColor={colors.secondary}
                        prefixIcon={<CheckRoundedIcon/>}
                        margin='0 20px 20px 0'
                    >
                        Submit
                    </Button>
                    <Button
                        bgColor={colors.primary}
                        fullWidth={false}
                        onClick={handleFormCancel}
                        prefixIcon={<ClearRoundedIcon/>}
                        margin='0 0 20px 0'
                    >
                        Cancel
                    </Button>
                </Grid>
            </form>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    userId: selectUserId,
});

export default connect(mapStateToProps)(TransactionForm);
