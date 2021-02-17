/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import * as React from 'react';
import { queryCache } from 'react-query';
import * as auth from '@FE/providers/auth-provider';
import { client } from '@FE/utils/api-client';
import { useAsync } from '@FE/utils/hooks';
import { FullPageSpinner, FullPageErrorFallback } from '@FE/components/lib';

async function bootstrapAppData() {
    let user = null;

    const token = await auth.getToken();
    if (token) {
        const data = await client('bootstrap', { token });
        queryCache.setQueryData('list-items', data.listItems, {
            staleTime: 5000,
        });
        user = data.user;
    }
    return user;
}
const AuthContext = React.createContext();
AuthContext.displayName = 'AuthContext';

function AuthProvider(props) {
    const {
        data: user,
        error,
        isLoading,
        isIdle,
        isError,
        isSuccess,
        run,
        setData,
        status,
    } = useAsync();

    React.useEffect(() => {
        const appDataPromise = bootstrapAppData();
        run(appDataPromise);
    }, [run]);

    const login = React.useCallback(
        (form) => auth.login(form).then((user) => setData(user)),
        [setData]
    );
    const register = React.useCallback(
        (form) => auth.register(form).then((user) => setData(user)),
        [setData]
    );
    const logout = React.useCallback(() => {
        auth.logout();
        setData(null);
        queryCache.clear();
    }, [setData]);

    const value = React.useMemo(() => ({ user, login, logout, register }), [
        login,
        logout,
        register,
        user,
    ]);

    if (isLoading || isIdle) {
        return <FullPageSpinner />;
    }

    if (isError) {
        return <FullPageErrorFallback error={error} />;
    }

    if (isSuccess) {
        return <AuthContext.Provider value={value} {...props} />;
    }

    throw new Error(`Unhandled status: ${status}`);
}

function useAuth() {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error(`useAuth must be used within a AuthProvider`);
    }
    return context;
}

function useClient() {
    const {
        user: { token },
    } = useAuth();
    return React.useCallback(
        (endpoint, config) => client(endpoint, { ...config, token }),
        [token]
    );
}

export { AuthProvider, useAuth, useClient };
