/* eslint-disable no-shadow */
/* eslint-disable prefer-promise-reject-errors */
import * as auth from '@FE/providers/auth-provider';
const apiURL = process.env.REACT_APP_API_URL;

function client(
    endpoint,
    { data, token, headers: customHeaders, ...customConfig } = {}
) {
    const config = {
        method: data ? 'POST' : 'GET',
        body: data ? JSON.stringify(data) : undefined,
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            'Content-Type': data ? 'application/json' : undefined,
            ...customHeaders,
        },
        ...customConfig,
    };

    return window
        .fetch(`${apiURL}/${endpoint}`, config)
        .then(async (response) => {
            if (response.status === 401) {
                await auth.logout();
                window.location.assign(window.location);
                return Promise.reject({ message: 'Please re-authenticate' });
            }

            const data = await response.json();
            if (response.ok) {
                return data;
            }
            return Promise.reject(data);
        });
}

export { client };
