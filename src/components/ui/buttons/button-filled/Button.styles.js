import MuiButton from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import {boxShadows} from "../../../../styles/global";

export const CustomButton = withStyles({
    root: {
        backgroundColor: props => props.bgcolor,
        color: props => props.textcolor,
        height: props => props.height,
        padding: '8px 20px',
        margin: props => props.margin,
        display: 'flex',
        justifyContent: props => props.justifycontent,
        alignItems: props => props.alias,
        borderRadius: '10px',
        '&:hover': {
            backgroundColor: props => props.bgcolor,
            color: props => props.textcolor,
            boxShadow: boxShadows.main,
        }
    }
})(MuiButton);