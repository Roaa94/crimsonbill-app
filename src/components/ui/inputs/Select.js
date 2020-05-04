import React from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from '@material-ui/core/InputLabel';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import FormControl from '@material-ui/core/FormControl';
import MuiSelect from "@material-ui/core/Select";

const Select = ({label, value, menuItems, ...otherProps}) => {

    return (
        <FormControl fullWidth={true} variant='filled'>
            <InputLabel id="dropdown-label">{label}</InputLabel>
            <MuiSelect
                labelId="dropdown-label"
                id="dropdown-select"
                value={value}
                IconComponent={ExpandMoreRoundedIcon}
                {...otherProps}
            >
                {
                    menuItems.map(({id, name}) => (
                        <MenuItem key={id} value={id}>
                            {name}
                        </MenuItem>
                    ))
                }
            </MuiSelect>
        </FormControl>
    );
};

export default Select;
