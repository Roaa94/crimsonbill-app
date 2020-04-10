import React from 'react';
import {AvatarContainer, AvatarImageWrapper, AvatarWrapper} from "./DrawerAvatar.styles";
import AvatarPlaceholder from '../../../assets/images/avatar-placeholder.png';

const DrawerAvatar = () => {
    return (
        <AvatarWrapper>
            <AvatarContainer>
                <AvatarImageWrapper>
                    <img src={AvatarPlaceholder} alt="Avatar"/>
                </AvatarImageWrapper>
            </AvatarContainer>
            <h2>John Doe</h2>
        </AvatarWrapper>
    );
};

export default DrawerAvatar;