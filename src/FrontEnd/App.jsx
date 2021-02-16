/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { hot } from 'react-hot-loader/root';
import React from 'react';
import { useAuth } from '@FE/context/auth-context';
import { AuthenticatedApp } from '@FE/apps/authenticated';
import { UnauthenticatedApp } from '@FE/apps/unauthenticated';

function App() {
    const { user } = useAuth();
    return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default hot(App);
