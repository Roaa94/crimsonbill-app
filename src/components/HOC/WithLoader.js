import React from 'react';
import {ReactComponent as Loader} from '../../assets/svg/loader.svg';
import styled from 'styled-components';

const DefaultLoaderWrapper = styled.div``;

const WithLoader = (WrappedComponent, LoaderWrapper = DefaultLoaderWrapper) => ({loading = false, ...otherProps}) => {

    return loading ? (
        <LoaderWrapper>
            <Loader/>
        </LoaderWrapper>
    ) : <WrappedComponent {...otherProps} />;

};

export default WithLoader;
