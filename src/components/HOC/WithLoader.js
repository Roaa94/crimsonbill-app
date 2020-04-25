import React from 'react';
import {ReactComponent as Loader} from '../../assets/svg/loader.svg';

const WithLoader = (WrappedComponent, LoaderWrapper) => ({loading, ...otherProps}) => {

    return loading ? (
        <LoaderWrapper>
            <Loader/>
        </LoaderWrapper>
    ) : <WrappedComponent {...otherProps} />;

};

export default WithLoader;
