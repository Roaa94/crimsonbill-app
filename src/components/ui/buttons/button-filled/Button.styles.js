import MuiButton from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import {borderRadius, boxShadows} from "../../../../styles/global";

export const CustomButton = withStyles({
    root: {
        backgroundColor: props => props.bgcolor,
        color: props => props.textcolor,
        height: props => props.height,
        padding: props => props.size === 'small' ? '3px 10px' : '8px 20px',
        margin: props => props.margin,
        fontSize: props => props.size === 'small' ? '0.7rem' : '0.8rem',
        borderRadius: props => props.size === 'small' ? borderRadius.s : borderRadius.m,
        '&:hover': {
            backgroundColor: props => props.bgcolor,
            color: props => props.textcolor,
            boxShadow: boxShadows.main,
        }
    }
})(MuiButton);