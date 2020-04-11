import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {PersistGate} from "redux-persist/integration/react";
import {store, persistor} from './redux/store';
import {ThemeProvider} from '@material-ui/core/styles';
import {theme} from './styles/global';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <App/>
                </ThemeProvider>
            </PersistGate>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
