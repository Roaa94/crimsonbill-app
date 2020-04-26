import React from 'react';
import IconButton from "../../buttons/IconButton";
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import {colors} from "../../../../styles/global";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {DropDownWrapper} from "./DropDown.styles";

const DropDown = ({buttonTitle, menuItems, fullHeightButton = true}) => {
    const [menuElement, setMenuElement] = React.useState(null);

    const handleClick = (event) => {
        setMenuElement(event.currentTarget);
    };

    const handleClose = () => {
        setMenuElement(null);
    };

    //Class component equivalent
    // state = {
    //     menuElement: null,
    // };
    //
    // let {buttonTitle} = this.props;
    // let {menuElement} = this.state;
    //
    // const handleClick = (event) => {
    //     this.setState({menuElement: event.currentTarget});
    // };
    //
    // const handleClose = () => {
    //     this.setState({menuElement: null});
    // };

    return (
        <DropDownWrapper fullHeightButton={fullHeightButton}>
            <IconButton suffixIcon={<ExpandMoreRoundedIcon/>} bgColor={colors.background} onClick={handleClick}>
                {buttonTitle}
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={menuElement}
                keepMounted
                getContentAnchorEl={null}
                open={Boolean(menuElement)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                onClose={handleClose}
            >
                {
                    menuItems.map(({id, title, handleClick}) => (
                        <MenuItem key={id} onClick={handleClick}>
                            {title}
                        </MenuItem>
                    ))
                }
            </Menu>
        </DropDownWrapper>
    );
};

export default DropDown;
