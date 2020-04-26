import React from 'react';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {DropDownWrapper} from "./DropDown.styles";
import MoreVertIcon from '@material-ui/icons/MoreVertIcon';
import IconButton from "@material-ui/core/IconButton";

const DropDown = ({menuItems, fullHeightButton = true}) => {
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
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
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
