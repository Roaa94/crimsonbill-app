import React from 'react';
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Button from "../ui/buttons/Button";
import {colors} from "../../styles/global";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

const TaxonomyItem = ({taxonomy, deleteItem}) => {
    let {id, name, icon, isDefault} = taxonomy;

    return (
        <Grid direction='row' container spacing={2} alignItems='center' justify='space-between'>
            <Grid xs item container spacing={2}>
                <Grid item>
                    <Icon fontSize='small' color='primary'>
                        {icon}
                    </Icon>
                </Grid>
                <Grid item>
                    {name}
                </Grid>
            </Grid>
            {
                !isDefault ? (
                    <Grid item>
                        <Button
                            bgColor={colors.white}
                            textColor={colors.primary}
                            size='small'
                            fullWidth={false}
                            onClick={() => deleteItem(id)}
                            prefixIcon={<DeleteRoundedIcon/>}
                            margin='0 10px 0 0'
                        >
                            Delete
                        </Button>
                    </Grid>
                ) : null
            }
        </Grid>
    );
};

export default TaxonomyItem;
