/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { hot } from 'react-hot-loader/root';
import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { BrowserRouter as Router } from 'react-router-dom';

import * as auth from '@FE/providers/auth-provider';
import { client } from '@FE/utils/api-client';
import { AuthenticatedApp } from '@FE/apps/authenticated';
import { UnauthenticatedApp } from '@FE/apps/unauthenticated';
import { FullPageSpinner } from '@FE/components/lib';
import { useAsync } from '@FE/utils/hooks';
import * as colors from './styles/colors';

async function getUser() {
    let user = null;

    const token = await auth.getToken();
    if (token) {
        const data = await client('me', { token });
        user = data.user;
    }

    return user;
}

function App() {
    const {
        data: user,
        error,
        isLoading,
        isIdle,
        isError,
        isSuccess,
        run,
        setData,
    } = useAsync();

    React.useEffect(() => {
        run(getUser());
    }, [run]);

    const login = (form) => auth.login(form).then((user) => setData(user));
    const register = (form) =>
        auth.register(form).then((user) => setData(user));
    const logout = () => {
        auth.logout();
        setData(null);
    };

    if (isLoading || isIdle) {
        return <FullPageSpinner />;
    }
    if (isError) {
        return (
            <div
                css={{
                    color: colors.danger,
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <p>Uh oh... There's a problem. Try refreshing the app.</p>
                <pre>{error.message}</pre>
            </div>
        );
    }
    if (isSuccess) {
        const props = { user, login, register, logout };
        return user ? (
            <Router>
                <AuthenticatedApp {...props} />
            </Router>
        ) : (
            <UnauthenticatedApp {...props} />
        );
    }
}

export default hot(App);
