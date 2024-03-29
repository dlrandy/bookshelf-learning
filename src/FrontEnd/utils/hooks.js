/* eslint-disable no-shadow */
/* eslint-disable no-void */
/* eslint-disable no-return-assign */
import React from 'react';
import { wrap } from '@FE/components/profiler';

function useSafeDispatch(dispatch) {
    const mounted = React.useRef(false);
    React.useLayoutEffect(() => {
        mounted.current = true;
        return () => (mounted.current = false);
    }, []);

    return React.useCallback(
        (...args) => (mounted.current ? dispatch(...args) : void 0),
        [dispatch]
    );
}

const defaultInitialState = {
    status: 'idle',
    data: null,
    error: null,
};

function useAsync(initialState, reducer = (s, a) => ({ ...s, ...a })) {
    const initialStateRef = React.useRef({
        ...defaultInitialState,
        ...initialState,
    });

    const [{ status, data, error }, setState] = React.useReducer(
        reducer,
        initialStateRef.current
    );

    const safeSetState = useSafeDispatch(setState);

    const setData = React.useCallback(
        (data) => safeSetState({ data, status: 'resolved' }),
        [safeSetState]
    );
    const setError = React.useCallback(
        (error) => safeSetState({ error, status: 'rejected' }),
        [safeSetState]
    );
    const reset = React.useCallback(
        () => safeSetState(initialStateRef.current),
        [safeSetState]
    );

    const run = React.useCallback(
        (promise) => {
            if (!promise || !promise.then) {
                throw new Error(`
            useAsync的参数必须是promise！
            `);
            }

            safeSetState({ status: 'pending' });

            return promise.then(
                wrap((data) => {
                    setData(data);
                    return data;
                }),
                wrap((error) => {
                    setError(error);
                    return Promise.reject(error);
                })
            );
        },
        [safeSetState, setData, setError]
    );

    return {
        isIdle: status === 'idle',
        isLoading: status === 'pending',
        isError: status === 'rejected',
        isSuccess: status === 'resolved',
        setData,
        setError,
        error,
        status,
        data,
        run,
        reset,
    };
}

export { useAsync };
