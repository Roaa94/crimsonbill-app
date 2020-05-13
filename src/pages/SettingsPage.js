import React from 'react';
import PageWrapper from "../components/ui/layout/PageWrapper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import AccountTypesCard from "../components/taxonomies/AccountTypesCard";
import SpendingCategoriesCard from "../components/taxonomies/SpendingCategoriesCard";
import IncomeSourcesCard from "../components/taxonomies/IncomeSourcesCard";

const SettingsPage = () => {
    return (
        <PageWrapper>
            <h1>Settings</h1>
            <Box p={2}>
                <Grid container alignItems='stretch' spacing={2}>
                    <Grid item xs={12} md={6}>
                        Currencies card
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <AccountTypesCard/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SpendingCategoriesCard/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <IncomeSourcesCard/>
                    </Grid>
                </Grid>
            </Box>
        </PageWrapper>
    );
};

export default SettingsPage;