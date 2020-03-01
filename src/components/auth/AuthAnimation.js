import React from 'react';
import styled from 'styled-components';
import {ReactComponent as AuthArtwork} from '../../assets/images/woman-working.svg';

const AnimationWrapper = styled.div`
  .head{
    transform-origin: 988px 327px;
    animation: head 3s infinite ease-in-out;
  }
  
  @keyframes head{
    50%{transform: rotate(4deg);}
  }
  
  .arm-2{
    transform-origin: 1297px 615px;
    animation: arm 1s infinite ease-out;
    animation-play-state: ${props => props.animationState ? 'paused' : 'running'};
  }
  
  @keyframes arm{
    50%{transform: rotate(3deg);}
  }
  
  .front-foot{
    transform-origin: 988px 1686px;
    animation: foot 1s infinite ease-in-out;
  }
  
  @keyframes foot{
    50%{transform: rotate(5deg);}
  }
`;

class AuthAnimation extends React.Component {
    state = {
        pauseAnimation: true,
    };

    toggleAnimation = () => {
        this.setState({pauseAnimation: !this.state.pauseAnimation})
    };

    render() {
        const {pauseAnimation} = this.state;

        return (
            <AnimationWrapper animationState={pauseAnimation}>
                {/*<span onClick={this.toggleAnimation}>Toggle animation</span>*/}
                <AuthArtwork/>
            </AnimationWrapper>
        );
    }
}

export default AuthAnimation;