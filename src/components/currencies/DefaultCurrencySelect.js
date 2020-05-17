import React from 'react';
import CurrencySelect from "../ui/inputs/CurrencySelect";
import {setDefaultCurrency} from "../../firebase/user.firebase-utils";
import {selectDefaultCurrencyCode, selectUserId} from "../../redux/user/user.selectors";
import {connect} from "react-redux";

const DefaultCurrencySelect = ({defaultCurrencyCode, userId}) => {

    return (
        <CurrencySelect
            label='Default Currency'
            name='currencyCode'
            value={defaultCurrencyCode}
            whiteBg
            handleChange={event => setDefaultCurrency(userId, event.target.value)}
        />
    );
};

const mapStateToProps = state => ({
    userId: selectUserId(state),
    defaultCurrencyCode: selectDefaultCurrencyCode(state),
});

export default connect(mapStateToProps)(DefaultCurrencySelect);
