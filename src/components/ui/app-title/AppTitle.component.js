import React from 'react';
import {AppTitleContainer} from "./AppTitle.styles";
import Logo from "../Logo";

const AppTitle = () => {
    return (
        <AppTitleContainer>
            <Logo/>
            <h3>Tracker</h3>
        </AppTitleContainer>
    );
};

export default AppTitle;