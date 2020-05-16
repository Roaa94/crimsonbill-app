import React from 'react';
import PageWrapper from "../components/ui/layout/PageWrapper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TaxonomyCard from "../components/taxonomies/taxonomy-card/TaxonomyCard";
import CurrenciesCard from "../components/currencies/currencies-card/CurrenciesCard";

const SettingsPage = () => {
    return (
        <PageWrapper>
            <h2>Settings</h2>
            <Box py={2}>
                <Grid container alignItems='stretch' spacing={2}>
                    <Grid item xs={12} md={6}>
                        <CurrenciesCard/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TaxonomyCard
                            header='Financial Account Types'
                            taxonomyCollectionName='accountTypes'
                            taxonomyIcon='credit_card_rounded_icon'
                            textFieldLabel='Add Account Type'
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TaxonomyCard
                            header='Spending Categories'
                            taxonomyCollectionName='spendingCategories'
                            taxonomyIcon='category_rounded_icon'
                            textFieldLabel='Add Spending Category'
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TaxonomyCard
                            header='Income Sources'
                            taxonomyCollectionName='incomeSources'
                            taxonomyIcon='account_balance_wallet_rounded_icon'
                            textFieldLabel='Add Income Source'
                            noItemsText='Add your income sources'
                        />
                    </Grid>
                </Grid>
            </Box>
        </PageWrapper>
    );
};

export default SettingsPage;