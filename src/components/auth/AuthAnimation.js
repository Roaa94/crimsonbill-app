import React from 'react';
import styled from 'styled-components';
import {ReactComponent as AuthArtwork} from '../../assets/svg/auth-artwork.svg';

const AnimationWrapper = styled.div``;

class AuthAnimation extends React.Component {

    render() {
        return (
            <AnimationWrapper>
                <AuthArtwork/>
            </AnimationWrapper>
        );
    }
}

export default AuthAnimation;