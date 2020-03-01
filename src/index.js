import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {PersistGate} from "redux-persist/integration/react";
import {store, persistor} from './redux/store';
import {ThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0E2549'
        },
        secondary: {
            main: '#E2474B'
        },
        info: {
            main: '#A1C5E2'
        },
    },
    typography: {
        fontFamily: 'Raleway',
    }
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <App/>
                </ThemeProvider>
            </PersistGate>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
