import React from 'react';
import {CurrencyListItemContainer} from "./CurrencyListItem.styles";
import Grid from "@material-ui/core/Grid";
import CurrencyCode from "../CurrencyCode";
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import FormattedNumber from "../../ui/FormattedNumber";
import {connect} from "react-redux";
import {selectDefaultCurrency} from "../../../redux/currencies/currencies.selectors";

const CurrencyListItem = ({id, code, name, rate, isDefault, onClick, defaultCurrency}) => {
    return (
        <CurrencyListItemContainer selected={isDefault} onClick={() => onClick(id, code)}>
            <Grid container alignItems='center' justify='space-between'>
                <Grid item>
                    <CurrencyCode currencyCode={code}/>
                    <span className='currency-code'>{code}</span>
                    <span>{name}</span>
                </Grid>
                <Grid item className='list-item-end'>
                    {
                        isDefault ? (
                            <CheckRoundedIcon color='secondary'/>
                        ) : (
                            <FormattedNumber number={rate} currencyId={defaultCurrency.id}/>
                        )
                    }
                </Grid>
            </Grid>
        </CurrencyListItemContainer>
    );
};

const mapStateToProps = state => ({
    defaultCurrency: selectDefaultCurrency(state),
})

export default connect(mapStateToProps)(CurrencyListItem);
