import React from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from '@material-ui/core/InputLabel';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import FormControl from '@material-ui/core/FormControl';
import MuiSelect from "@material-ui/core/Select";
import CurrencyCode from "../../currencies/CurrencyCode";

const CurrencySelect = ({label, value, menuItems, ...otherProps}) => {

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
                    menuItems.map(({id, code}) => (
                        <MenuItem dense key={id} value={id}>
                            <CurrencyCode currencyCode={code}/>
                            {code}
                        </MenuItem>
                    ))
                }
            </MuiSelect>
        </FormControl>
    );
};

export default CurrencySelect;
