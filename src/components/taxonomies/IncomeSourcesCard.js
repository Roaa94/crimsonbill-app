import React from 'react';
import TaxonomyCard from "./taxonomy-card/TaxonomyCard";
import {selectTaxonomyArray} from "../../redux/settings/settings.selectors";
import {connect} from "react-redux";

const IncomeSourcesCard = ({incomeSources}) => {
    return (
        <TaxonomyCard
            header='Income Sources'
            items={incomeSources}
            noItemsText='Add your income sources'
            textFieldLabel='Add Income Source'
        />
    );
};

const mapStateToProps = (state) => ({
    incomeSources: selectTaxonomyArray('incomeSources')(state),
});

export default connect(mapStateToProps)(IncomeSourcesCard);
