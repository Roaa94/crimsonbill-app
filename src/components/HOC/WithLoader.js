import React from 'react';
import {ReactComponent as CircleLoader} from '../../assets/svg/loader.svg';
import {ReactComponent as DotsLoader} from '../../assets/svg/loader-h.svg';
import styled from 'styled-components';

const DefaultLoaderWrapper = styled.div`
  width: 100%;
  height: ${props => props.fullHeight ? '100%' : 'auto'};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WithLoader = (WrappedComponent, LoaderWrapper = DefaultLoaderWrapper) => ({loading = false, fullHeightLoader = true, type, ...otherProps}) => {

    return loading ? (
        <LoaderWrapper fullHeight={fullHeightLoader}>
            {
                type === 'dots' ? <DotsLoader/> : <CircleLoader/>
            }
        </LoaderWrapper>
    ) : <WrappedComponent {...otherProps} />;

};

export default WithLoader;
