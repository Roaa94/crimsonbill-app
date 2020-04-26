import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import withStyles from "@material-ui/core/styles/withStyles";
import {boxShadows, colors} from "../../../../styles/global";
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";

export const SelectWrapper = styled.div`
  height: ${props => props.fullHeightButton ? '100%' : 'auto'};
  min-height: 56px;
`;

export const SelectFormControl = withStyles(theme => ({
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
    },
}))(FormControl);

export const CustomSelect = withStyles({
    selectMenu: {
        borderRadius: '10px !important',
        transition: 'box-shadow .3s',
        '&:hover': {
            boxShadow: boxShadows.main,
        }
    }
})(Select);

export const useStyles = makeStyles(() => ({
    menuPaper: {
        borderRadius: '10px !important',
        boxShadow: boxShadows.main,
        '& .MuiList-root': {
            padding: 0,
        }
    },
}));