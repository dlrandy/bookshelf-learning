/* eslint-disable no-undef */
import { server, rest } from '@FE/test/server';
import { client } from '@FE/utils/api-client';

const apiURL = process.env.REACT_APP_API_URL || 'mock-api';
console.log('apiURL-----------', apiURL);

test('should make GET requests to the given endpoint', async () => {
    const endpoint = 'test-endpoint';
    const mockResult = {
        mockValue: 'value',
    };
    server.use(
        rest.get(`${apiURL}/${endpoint}`, async () => res(ctx.json(mockResult)))
    );
    const result = await client(endpoint);
    expect(result).toEqual(mockResult);
});

test.todo('adds auth token when a token is provided');
// 🐨 create a fake token (it can be set to any string you want)
// 🐨 create a "request" variable with let
// 🐨 create a server handler to handle a test request you'll be making
// 🐨 inside the server handler, assign "request" to "req" so we can use that
//     to assert things later.
//     💰 so, something like...
//       async (req, res, ctx) => {
//         request = req
//         ... etc...
//
// 🐨 call the client with the token (note that it's async)
// 🐨 verify that `request.headers.get('Authorization')` is correct (it should include the token)

test.todo('allows for config overrides');
// 🐨 do a very similar setup to the previous test
// 🐨 create a custom config that specifies properties like "mode" of "cors" and a custom header
// 🐨 call the client with the endpoint and the custom config
// 🐨 verify the request had the correct properties

test.todo(
    'when data is provided, it is stringified and the method defaults to POST'
);
// 🐨 create a mock data object
// 🐨 create a server handler very similar to the previous ones to handle the post request
//    💰 Use rest.post instead of rest.get like we've been doing so far
// 🐨 call client with an endpoint and an object with the data
//    💰 client(endpoint, {data})
// 🐨 verify the request.body is equal to the mock data object you passed
