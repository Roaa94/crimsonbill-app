import React from 'react';
import {CurrencyListItemContainer} from "./CurrencyListItem.styles";
import Grid from "@material-ui/core/Grid";
import CurrencyCode from "../CurrencyCode";
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import FormattedNumber from "../../ui/FormattedNumber";
import {connect} from "react-redux";
import {selectDefaultCurrencyCode} from "../../../redux/user/user.selectors";

const CurrencyListItem = ({currency, onClick, defaultCurrencyCode}) => {
    const {id, code, name} = currency;
    const rate = currency[`to${defaultCurrencyCode}`];

    return (
        <CurrencyListItemContainer selected={defaultCurrencyCode === id} onClick={() => onClick(code)}>
            <Grid container alignItems='center' justify='space-between'>
                <Grid item>
                    <CurrencyCode currencyCode={code}/>
                    <span className='currency-code'>{code}</span>
                    <span>{name}</span>
                </Grid>
                <Grid item className='list-item-end'>
                    {
                        defaultCurrencyCode === id ? (
                            <CheckRoundedIcon color='secondary'/>
                        ) : (
                            <FormattedNumber number={rate} currencyCode={defaultCurrencyCode}/>
                        )
                    }
                </Grid>
            </Grid>
        </CurrencyListItemContainer>
    );
};

const mapStateToProps = state => ({
    defaultCurrencyCode: selectDefaultCurrencyCode(state),
})

export default connect(mapStateToProps)(CurrencyListItem);
