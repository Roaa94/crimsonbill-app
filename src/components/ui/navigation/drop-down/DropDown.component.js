import React from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from "@material-ui/core/IconButton";
import {DropDownMenu, DropDownWrapper} from "./DropDown.styles";

const DropDown = ({menuItems}) => {
    const [menuElement, setMenuElement] = React.useState(null);

    const handleClick = event => {
        event.stopPropagation();
        setMenuElement(event.currentTarget);
    };

    const handleClose = event => {
        event.stopPropagation();
        setMenuElement(null);
    };

    return (
        <DropDownWrapper>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <DropDownMenu
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
            </DropDownMenu>
        </DropDownWrapper>
    );
};

export default DropDown;
