import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactQueryConfigProvider } from 'react-query';
import { AuthProvider } from '@FE/context/auth-context';

const queryConfig = {
    queries: {
        useErrorBoundary: true,
        refetchOnWindowFocus: false,
        retry(failureCount, error) {
            if (error.status === 404) return false;
            if (failureCount < 2) return true;
            return false;
        },
    },
};
function AppProviders({ children }) {
    return (
        <ReactQueryConfigProvider config={queryConfig}>
            <Router>
                <AuthProvider>{children}</AuthProvider>
            </Router>
        </ReactQueryConfigProvider>
    );
}

export { AppProviders };
