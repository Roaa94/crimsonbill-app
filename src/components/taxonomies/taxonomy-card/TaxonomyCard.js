import React from 'react';
import {TaxonomyCardContainer} from "./TaxonomyCard.styles";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {colors} from "../../../styles/global";
import AddIconButton from "../../ui/buttons/AddIconButton";

const TaxonomyCard = (
    {
        header,
        listHeight = 200,
        items,
        noItemsText,
        textFieldLabel,
        textFieldValue,
        onFieldChange,
        onFormSubmit
    }
) => {
    console.log('items');
    console.log(items);
    return (
        <TaxonomyCardContainer listHeight={listHeight}>
            <Grid container direction='column' justify='space-between' className='taxonomy-card-grid'>
                <Grid item>
                    <h4>{header}</h4>
                </Grid>
                <Grid item>
                    <div className="list">
                        {
                            !items || items.length === 0
                                ? noItemsText
                                : (

                                    items.map(({id, name, icon}) => (
                                        <Grid container spacing={2} alignItems='center' key={id}>
                                            <Grid item>
                                                <Icon fontSize='small' color='primary'>
                                                    {icon}
                                                </Icon>
                                            </Grid>
                                            <Grid item>
                                                {name}
                                            </Grid>
                                        </Grid>
                                    ))

                                )
                        }
                    </div>
                </Grid>
                <Grid item container spacing={2} alignItems='center'>
                    <Grid item xs>
                        <TextField
                            label={textFieldLabel}
                            value={textFieldValue}
                            onChange={onFieldChange}
                            type='text'
                        />
                    </Grid>
                    <Grid item>
                        <AddIconButton
                            bgColor={colors.secondary}
                            color={colors.white}
                            dense
                            handleClick={onFormSubmit}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </TaxonomyCardContainer>
    );
};

export default TaxonomyCard;
