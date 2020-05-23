import React from 'react';
import WithLoader from "./HOC/WithLoader";
import {
    selectDefaultCurrencyCode,
    selectIsCalculatingBalance,
    selectUserTotalBalance
} from "../redux/user/user.selectors";
import {connect} from "react-redux";
import {compose} from "redux";
import FormattedNumber from "./ui/FormattedNumber";

const Balance = ({isTotal = true, fontSize, totalBalance, userTotalBalance, defaultCurrencyCode}) => {
    return (
        <FormattedNumber
            fontSize={fontSize}
            number={isTotal ? userTotalBalance : totalBalance}
            currencyCode={defaultCurrencyCode}
        />
    );
};

const mapStateToProps = state => ({
    loading: selectIsCalculatingBalance(state),
    userTotalBalance: selectUserTotalBalance(state),
    defaultCurrencyCode: selectDefaultCurrencyCode(state)
});

const BalanceWrapper = compose(
    connect(mapStateToProps),
    WithLoader,
)(Balance);

export default BalanceWrapper;
