import React from 'react';
import TextField from '@material-ui/core/TextField';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";

const Autocomplete = ({options, idValue, label, ...otherProps}) => {
    const hasOptions = options.length !== 0;
    const targetValue = options.find(item => item.id === idValue);

    return (
        <MuiAutocomplete
            {...otherProps}
            options={options}
            value={targetValue ? targetValue : hasOptions ? options[0] : ''}
            id="auto-complete"
            popupIcon={<ExpandMoreRoundedIcon/>}
            renderOption={(option, state) => {
                return (
                    <Grid container spacing={1} alignItems='center'>
                        {
                            option.icon ? (
                                <Grid item mr={1}>
                                    <Icon fontSize='small' color='primary'>
                                        {option.icon}
                                    </Icon>
                                </Grid>
                            ) : null
                        }
                        <Grid item>
                            {option.name ? option.name : ''}
                        </Grid>
                    </Grid>
                )
            }}
            getOptionLabel={(option) => option.name ? option.name : ''}
            getOptionSelected={(option, value) => option.id === value.id}
            renderInput={
                (params) => (
                    <TextField
                        required
                        {...params}
                        label={label}
                    />
                )
            }
        />
    );
};

export default Autocomplete;
