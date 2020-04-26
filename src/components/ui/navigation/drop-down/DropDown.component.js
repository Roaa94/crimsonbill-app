import React from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import {DropDownFormControl, DropDownWrapper} from "./DropDown.styles";
import InputLabel from '@material-ui/core/InputLabel';
import Select from "@material-ui/core/Select";
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

const DropDown = ({label, value, menuItems, fullHeightButton = true, ...otherProps}) => {

    return (
        <DropDownWrapper fullHeightButton={fullHeightButton}>
            <DropDownFormControl fullWidth={true} variant='filled'>
                <InputLabel id="dropdown-label">{label}</InputLabel>
                <Select
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
                </Select>
            </DropDownFormControl>
        </DropDownWrapper>
    );
};

export default DropDown;
