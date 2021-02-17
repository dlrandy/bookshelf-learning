/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { hot } from 'react-hot-loader/root';
import React from 'react';
import { useAuth } from '@FE/context/auth-context';
import { FullPageSpinner } from '@FE/components/lib';

const AuthenticatedApp = React.lazy(() => import('@FE/apps/authenticated'));
const UnauthenticatedApp = React.lazy(() => import('@FE/apps/unauthenticated'));

function App() {
    const { user } = useAuth();
    return (
        <React.Suspense fallback={<FullPageSpinner />}>
            {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </React.Suspense>
    );
}

export default hot(App);
