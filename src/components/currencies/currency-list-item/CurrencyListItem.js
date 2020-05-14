import React from 'react';
import {CurrencyListItemContainer} from "./CurrencyListItem.styles";
import Grid from "@material-ui/core/Grid";
import CurrencyCode from "../CurrencyCode";
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';

const CurrencyListItem = ({id, code, name, isDefault, onClick}) => {
    return (
        <CurrencyListItemContainer selected={isDefault} onClick={() => onClick(id)}>
            <Grid container alignItems='center' justify='space-between'>
                <Grid item>
                    <CurrencyCode currencyCode={code}/>
                    <span className='currency-code'>{code}</span>
                    <span>{name}</span>
                </Grid>
                {
                    isDefault ? (
                        <Grid item>
                            <CheckRoundedIcon color='secondary'/>
                        </Grid>
                    ) : null
                }
            </Grid>
        </CurrencyListItemContainer>
    );
};

export default CurrencyListItem;
