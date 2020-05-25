import React from 'react';
import CurrencySelect from "../ui/inputs/CurrencySelect";
import {setDefaultCurrency} from "../../utils/firebase/user.firebase-utils";
import {selectDefaultCurrencyCode, selectUserId} from "../../redux/user/user.selectors";
import {connect} from "react-redux";
import {setIsCalculatingBalance} from "../../redux/user/user.actions";

const DefaultCurrencySelect = ({defaultCurrencyCode, userId, setIsCalculatingBalance}) => {

    const handleCurrencyChange = async event => {
        setIsCalculatingBalance(true);
        await setDefaultCurrency(userId, event.target.value);
        setIsCalculatingBalance(false);
    }

    return (
        <CurrencySelect
            label='Default Currency'
            name='currencyCode'
            value={defaultCurrencyCode}
            whiteBg
            handleChange={handleCurrencyChange}
        />
    );
};

const mapStateToProps = state => ({
    userId: selectUserId(state),
    defaultCurrencyCode: selectDefaultCurrencyCode(state),
});

const mapDispatchToProps = dispatch => ({
    setIsCalculatingBalance: value => dispatch(setIsCalculatingBalance(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultCurrencySelect);
