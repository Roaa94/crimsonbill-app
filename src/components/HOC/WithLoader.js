import React from 'react';
import {ReactComponent as CircleLoader} from '../../assets/svg/loader.svg';
import {ReactComponent as DotsLoader} from '../../assets/svg/loader-h.svg';
import styled from 'styled-components';
import {pageMargin, pagePadding} from "../../styles/global";

const DefaultLoaderWrapper = styled.div`
  width: 100%;
  height: ${props => props.fullHeight ? `calc(100vh - ${pagePadding * 2 + pageMargin * 2}px)` : 'auto'};
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
