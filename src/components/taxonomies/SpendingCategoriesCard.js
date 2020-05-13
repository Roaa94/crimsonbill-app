import React from 'react';
import TaxonomyCard from "./taxonomy-card/TaxonomyCard";
import {selectTaxonomyArray} from "../../redux/settings/settings.selectors";
import {connect} from "react-redux";

const SpendingCategoriesCard = ({spendingCategories}) => {
    return (
        <TaxonomyCard
            header='Spending Categories'
            items={spendingCategories}
            textFieldLabel='Add Spending Category'
        />
    );
};

const mapStateToProps = (state) => ({
    spendingCategories: selectTaxonomyArray('spendingCategories')(state),
});

export default connect(mapStateToProps)(SpendingCategoriesCard);
