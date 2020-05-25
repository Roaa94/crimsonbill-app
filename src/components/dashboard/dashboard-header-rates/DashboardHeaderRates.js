import React from 'react';
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {Grid} from "@material-ui/core";
import {DashboardHeaderRatesContainer, DashboardHeaderRatesList} from "./DashboardHeaderRates.styles";
import FormattedNumber from "../../ui/FormattedNumber";
import CurrencyCode from "../../currencies/CurrencyCode";
import {selectAppCurrencies} from "../../../redux/currencies/currencies.selectors";
import {selectDefaultCurrencyCode} from "../../../redux/user/user.selectors";

const DashboardHeaderRates = ({appCurrencies, defaultCurrencyCode}) => {
    const otherAppCurrencies = appCurrencies.filter(currency => currency.code !== defaultCurrencyCode);
    return (
        <DashboardHeaderRatesContainer>
            <DashboardHeaderRatesList>
                {
                    otherAppCurrencies ? (
                        otherAppCurrencies.map(currency => {
                            const rate = currency[`to${defaultCurrencyCode}`];

                            return (
                                <Grid key={currency.id} container alignItems='center' justify='space-between'
                                      spacing={2}>
                                    <Grid item>
                                        <CurrencyCode currencyCode={currency.code}/>
                                        <span className='currency-code'>{currency.code}</span>
                                    </Grid>
                                    <Grid item>
                                        <FormattedNumber number={rate} currencyCode={defaultCurrencyCode}/>
                                    </Grid>
                                </Grid>
                            )
                        })
                    ) : null
                }
            </DashboardHeaderRatesList>
        </DashboardHeaderRatesContainer>
    );
};

const mapStateToProps = createStructuredSelector({
    appCurrencies: selectAppCurrencies,
    defaultCurrencyCode: selectDefaultCurrencyCode,
});

export default connect(mapStateToProps)(DashboardHeaderRates);
