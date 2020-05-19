import React from 'react';
import Autocomplete from "../../ui/inputs/Autocomplete";
import {selectTaxonomyArray} from "../../../redux/taxonomies/taxonomies.selectors";
import {connect} from "react-redux";

const TransactionTypeAutoComplete = (
    {
        isSpending,
        categoryId,
        sourceId,
        onInputChange,
        incomeSources,
        spendingCategories,
        toEdit = false,
    }
) => {
    return (
        isSpending ? (
            <Autocomplete
                options={spendingCategories}
                idValue={categoryId}
                disabled={toEdit}
                onChange={
                    (event, value) => {
                        if (value) {
                            onInputChange('categoryId', value.id);
                        }
                    }
                }
                label='Category'
                noOptionsText='No matching category, add from settings'
            />
        ) : (
            <Autocomplete
                options={incomeSources}
                idValue={sourceId}
                disabled={toEdit}
                onChange={
                    (event, value) => {
                        if (value) {
                            onInputChange('sourceId', value.id);
                        }
                    }
                }
                label='Source'
                noOptionsText='No matching source, add from settings'
            />
        )
    );
};

const mapStateToProps = state => ({
    spendingCategories: selectTaxonomyArray('spendingCategories')(state),
    incomeSources: selectTaxonomyArray('incomeSources')(state),
});

export default connect(mapStateToProps)(TransactionTypeAutoComplete);
