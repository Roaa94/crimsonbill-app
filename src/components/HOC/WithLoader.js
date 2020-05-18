import React from 'react';
import {ReactComponent as CircleLoader} from '../../assets/svg/loader.svg';
import {ReactComponent as DotsLoader} from '../../assets/svg/loader-h.svg';
import styled from 'styled-components';

const DefaultLoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WithLoader = (WrappedComponent, LoaderWrapper = DefaultLoaderWrapper) => ({loading = false, type, ...otherProps}) => {

    return loading ? (
        <LoaderWrapper>
            {
                type === 'dots' ? <DotsLoader/> : <CircleLoader/>
            }
        </LoaderWrapper>
    ) : <WrappedComponent {...otherProps} />;

};

export default WithLoader;
