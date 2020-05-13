import React from 'react';
import {selectTaxonomyArray} from "../../redux/settings/settings.selectors";
import {connect} from "react-redux";
import TaxonomyCard from "./taxonomy-card/TaxonomyCard";

const AccountTypesCard = ({accountTypes}) => {
    return (
        <TaxonomyCard
            header='Financial Account Types'
            items={accountTypes}
            textFieldLabel='Add Account Type'
        />
    );
};

const mapStateToProps = (state) => ({
    accountTypes: selectTaxonomyArray('accountTypes')(state),
});

export default connect(mapStateToProps)(AccountTypesCard);
