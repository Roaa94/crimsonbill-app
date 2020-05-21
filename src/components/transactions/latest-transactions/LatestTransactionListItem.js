import React from 'react';
import Grid from "@material-ui/core/Grid";
import TransactionTypeIcon from "../TransactionTypeIcon";
import FormattedNumber from "../../ui/FormattedNumber";
import {format} from "date-fns";
import {selectTaxonomyValue} from "../../../redux/taxonomies/taxonomies.selectors";
import {connect} from "react-redux";
import {LatestTransactionsListItemContainer} from "./LatestTransactions.styles";
import Box from "@material-ui/core/Box";

const LatestTransactionListItem = ({transaction, taxonomyValue}) => {
    let {type, title, currencyCode, amount, dateTime} = transaction;
    let formattedDate = format(dateTime.seconds * 1000, 'dd.MMM');

    return (
        <LatestTransactionsListItemContainer>
            <Grid container>
                <Grid item>
                    <TransactionTypeIcon
                        type={type}
                        disabled
                    />
                </Grid>
                <Grid item container xs spacing={1}>
                    <Grid item container alignItems='center' justify='space-between' xs={12}>
                        <Grid item>
                            <FormattedNumber
                                number={amount}
                                currencyCode={currencyCode}
                                negative={type === 'spending'}
                            />
                        </Grid>
                        <Grid item>
                            <Box fontWeight='600'>
                                {taxonomyValue.name}
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item container alignItems='center' justify='space-between' xs={12} wrap='nowrap'>
                        <Grid item>
                            {
                                title.length > 20 ? `${title.slice(0, 20)}...` : title
                            }
                        </Grid>
                        <Grid item>
                            {formattedDate}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </LatestTransactionsListItemContainer>
    );
};

const mapStateToProps = (state, ownProps) => {
    const isSpending = ownProps.transaction.type === 'spending';
    const taxonomyId = isSpending ? ownProps.transaction.categoryId : ownProps.transaction.sourceId;
    const taxonomyName = isSpending ? 'spendingCategories' : 'incomeSources';
    return {
        taxonomyValue: selectTaxonomyValue(taxonomyId, taxonomyName)(state),
    };
}

export default connect(mapStateToProps)(LatestTransactionListItem);
