import React from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import {SelectFormControll, SelectWrapper} from "./Select.styles";
import InputLabel from '@material-ui/core/InputLabel';
import MuiSelect from "@material-ui/core/Select";
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

const Select = ({label, value, menuItems, fullHeightButton = true, ...otherProps}) => {

    return (
        <SelectWrapper fullHeightButton={fullHeightButton}>
            <SelectFormControll fullWidth={true} variant='filled'>
                <InputLabel id="dropdown-label">{label}</InputLabel>
                <MuiSelect
                    autoWidth
                    labelId="dropdown-label"
                    id="dropdown-select"
                    value={value}
                    IconComponent={ExpandMoreRoundedIcon}
                    {...otherProps}
                >
                    {
                        menuItems.map(({id, title, value}) => (
                            <MenuItem key={id} value={value}>
                                {title}
                            </MenuItem>
                        ))
                    }
                </MuiSelect>
            </SelectFormControll>
        </SelectWrapper>
    );
};

export default Select;
