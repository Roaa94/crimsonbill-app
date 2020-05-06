import React from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from '@material-ui/core/InputLabel';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import FormControl from '@material-ui/core/FormControl';
import MuiSelect from "@material-ui/core/Select";
import Icon from "@material-ui/core/Icon";
import {Box} from "@material-ui/core";

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
                    menuItems.map(({id, name, icon}) => (
                        <MenuItem dense key={id} value={id}>
                            {
                                icon ? (
                                    <Box mr={1}>
                                        <Icon fontSize='small' color='primary'>
                                            {icon}
                                        </Icon>
                                    </Box>
                                ) : null
                            }
                            {name}
                        </MenuItem>
                    ))
                }
            </MuiSelect>
        </FormControl>
    );
};

export default Select;
