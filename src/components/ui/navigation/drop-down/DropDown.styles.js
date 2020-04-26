import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import withStyles from "@material-ui/core/styles/withStyles";
import {colors} from "../../../../styles/global";

export const DropDownWrapper = styled.div`
  height: ${props => props.fullHeightButton ? '100%' : 'auto'};
  min-height: 56px;
`;

export const DropDownFormControl = withStyles(theme => ({
    root: {
        '& label': {
            color: theme.palette.primary.main,
            fontSize: '0.9rem',
        },
        '& label.Mui-focused': {
            color: theme.palette.secondary.main,
        },
        '& .MuiInputLabel-shrink': {
            color: theme.palette.secondary.main,
        },
        '& .MuiFilledInput-root': {
            border: 'none',
            borderRadius: '10px',
            background: colors.background,
        },
        '& .MuiFilledInput-underline:before': {
            display: 'none',
        },
        '& .MuiFilledInput-underline:after': {
            display: 'none',
        },
        '& .MuiSelect-select:focus': {
            backgroundColor: 'transparent',
        },
    }
}))(FormControl);