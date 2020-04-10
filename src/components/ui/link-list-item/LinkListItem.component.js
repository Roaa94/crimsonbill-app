import React from 'react';
import {
    LinkListItemContainer,
} from "./LinkListItem.styles";

const LinkListItem = ({title, icon, color, handleClick, active}) => {

    return (
        <LinkListItemContainer color={color} onClick={handleClick} active={active}>
            <div className='icon-container'>{icon}</div>
            <div>{title}</div>
        </LinkListItemContainer>
    );
};

export default LinkListItem;