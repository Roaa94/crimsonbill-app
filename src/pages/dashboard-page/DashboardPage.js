import React from 'react';
import AppButton from "../../components/ui/AppButton";
import {auth} from '../../firebase/firebase.utils';

const DashboardPage = () => {
    return (
        <div>
            <h1>This is the dashboard</h1>
            <AppButton onClick={() => auth.signOut()} fullWidth={false}>
                SIGN OUT
            </AppButton>
        </div>
    );
};

export default DashboardPage;