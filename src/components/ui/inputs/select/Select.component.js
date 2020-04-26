import React from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import {CustomSelect, SelectFormControl, SelectWrapper, useStyles} from "./Select.styles";
import InputLabel from '@material-ui/core/InputLabel';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

const Select = ({label, value, menuItems, fullHeightButton = true, ...otherProps}) => {
    const classes = useStyles();
    const menuProps = {
        getContentAnchorEl: null,
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
        },
        transformOrigin: {
            vertical: "top",
            horizontal: "center",
        },
        classes: {
            paper: classes.menuPaper,
        }
    };
    return (
        <SelectWrapper fullHeightButton={fullHeightButton}>
            <SelectFormControl fullWidth={true} variant='filled'>
                <InputLabel id="dropdown-label">{label}</InputLabel>
                <CustomSelect
                    labelId="dropdown-label"
                    id="dropdown-select"
                    value={value}
                    MenuProps={menuProps}
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
                </CustomSelect>
            </SelectFormControl>
        </SelectWrapper>
    );
};

export default Select;
