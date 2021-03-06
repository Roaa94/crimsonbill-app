import React from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";

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
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={menuElement}
                keepMounted
                getContentAnchorEl={null}
                open={Boolean(menuElement)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                onClose={handleClose}
            >
                {
                    menuItems.map(({id, title, handleClick}) => (
                        <MenuItem
                            key={id}
                            onClick={event => {
                                handleClick();
                                handleClose(event);
                            }}
                        >
                            {title}
                        </MenuItem>
                    ))
                }
            </Menu>
        </div>
    );
};

export default DropDown;
