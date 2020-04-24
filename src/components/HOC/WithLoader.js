import React from 'react';
import {ReactComponent as Loader} from '../../assets/svg/loader.svg';
import {connect} from "react-redux";
import {selectLoading} from "../../redux/loading.reducer";
import {compose} from "redux";

const WithLoaderComponent = (WrappedComponent, LoaderWrapper) => ({loading, ...otherProps}) => {

    return loading ? (
        <LoaderWrapper>
            <Loader/>
        </LoaderWrapper>
    ) : <WrappedComponent {...otherProps} />;

};

const mapStateToProps = state => ({
    loading: selectLoading(state),
});

const WithLoader = compose(
    connect(mapStateToProps, null),
    WithLoaderComponent,
);

export default WithLoader;
