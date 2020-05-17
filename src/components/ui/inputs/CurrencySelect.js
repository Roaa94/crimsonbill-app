import React from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from '@material-ui/core/InputLabel';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import FormControl from '@material-ui/core/FormControl';
import MuiSelect from "@material-ui/core/Select";
import CurrencyCode from "../../currencies/CurrencyCode";
import {selectAppCurrencies} from "../../../redux/currencies/currencies.selectors";
import {connect} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {colors} from "../../../styles/global";

const useStyles = makeStyles(() => ({
    whiteBg: {
        backgroundColor: colors.white,
        '&.MuiFilledInput-input': {
            backgroundColor: colors.white,
        },
    }
}));

const CurrencySelect = ({label, value, name, handleChange, whiteBg = false, appCurrencies, fullWidth = true}) => {
    const classes = useStyles();

    return (
        <FormControl fullWidth={fullWidth} variant='filled'>
            <InputLabel id="dropdown-label">{label}</InputLabel>
            <MuiSelect
                labelId="dropdown-label"
                id="dropdown-select"
                value={value}
                name={name}
                onChange={handleChange}
                classes={{
                    root: whiteBg ? classes.whiteBg : null,
                }}
                IconComponent={ExpandMoreRoundedIcon}
            >
                {
                    appCurrencies.map(({id, code}) => (
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

const mapStateToProps = (state) => ({
    appCurrencies: selectAppCurrencies(state),
});

export default connect(mapStateToProps)(CurrencySelect);
