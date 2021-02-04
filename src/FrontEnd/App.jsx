/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { hot } from 'react-hot-loader/root';
import React from 'react';
import { jsx } from '@emotion/react';
import { BrowserRouter as Router } from 'react-router-dom';

import * as auth from '@FE/providers/auth-provider';
import { client } from '@FE/utils/api-client';
import { AuthenticatedApp } from '@FE/apps/authenticated';
import { UnauthenticatedApp } from '@FE/apps/unauthenticated';
import { FullPageSpinner } from '@FE/components/lib';
import { useAsync } from '@FE/utils/hooks';
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
        setUser(null);
    };

    return user ? (
        <AuthenticatedApp user={user} logout={logout} />
    ) : (
        <UnauthenticatedApp login={login} register={register} />
    );
}

export default hot(App);
