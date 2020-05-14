import React from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from '@material-ui/core/InputLabel';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import FormControl from '@material-ui/core/FormControl';
import MuiSelect from "@material-ui/core/Select";
import getSymbolFromCurrency from 'currency-symbol-map';
import styled from 'styled-components';
import {colors} from "../../../styles/global";

const CurrencyCode = styled.span`
    font-weight: 700;
    color: ${colors.primary};
    margin-right: 5px;
    display: inline-block;
    width: 20px;
`;

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
                            <CurrencyCode>
                                {getSymbolFromCurrency(code)}
                            </CurrencyCode>
                            {code}
                        </MenuItem>
                    ))
                }
            </MuiSelect>
        </FormControl>
    );
};

export default CurrencySelect;
