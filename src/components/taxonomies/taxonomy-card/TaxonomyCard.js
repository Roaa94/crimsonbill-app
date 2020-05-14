import React from 'react';
import {TaxonomyCardContainer} from "./TaxonomyCard.styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {colors} from "../../../styles/global";
import AddIconButton from "../../ui/buttons/AddIconButton";
import TaxonomyItem from "../TaxonomyItem";
import {selectUserId} from "../../../redux/user/user.selectors";
import {selectTaxonomyArray} from "../../../redux/settings/settings.selectors";
import {connect} from "react-redux";
import {addTaxonomy} from "../../../firebase/taxonomies.firebase-utils";

class TaxonomyCard extends React.Component {
    state = {
        name: '',
    };

    handleFormSubmit = async () => {
        let {name} = this.state;
        let {userId, taxonomyCollectionName, taxonomyIcon} = this.props;
        if(name === '') {
            return;
        }
        const taxonomyData = {
            createdAt: new Date(),
            isDefault: false,
            name: name,
            icon: taxonomyIcon
        };
        await addTaxonomy(userId, taxonomyCollectionName, taxonomyData);
        this.setState({name: ''});
    }

    handleFieldChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    render() {
        let {
            header,
            textFieldLabel,
            listHeight,
            taxonomyList,
            noItemsText,
        } = this.props;

        let {name} = this.state;

        return (
            <TaxonomyCardContainer listHeight={listHeight ? listHeight : 200}>
                <Grid container direction='column' justify='space-between' className='taxonomy-card-grid'>
                    <Grid item>
                        <h4>{header}</h4>
                    </Grid>
                    <Grid item>
                        <div className="list">
                            {
                                !taxonomyList || taxonomyList.length === 0
                                    ? noItemsText
                                    : taxonomyList.map(item => <TaxonomyItem key={item.id} taxonomy={item}/>)
                            }
                        </div>
                    </Grid>
                    <Grid item container spacing={2} alignItems='center'>
                        <Grid item xs>
                            <TextField
                                label={textFieldLabel}
                                value={name}
                                name='name'
                                onChange={this.handleFieldChange}
                                type='text'
                            />
                        </Grid>
                        <Grid item>
                            <AddIconButton
                                bgColor={colors.secondary}
                                color={colors.white}
                                dense
                                handleClick={this.handleFormSubmit}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </TaxonomyCardContainer>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    userId: selectUserId(state),
    taxonomyList: selectTaxonomyArray(ownProps.taxonomyCollectionName)(state),
});

export default connect(mapStateToProps)(TaxonomyCard);
