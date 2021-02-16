import 'react-hot-loader';
import '@FE/bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import App from '@FE/App';
import { AppProviders } from '@FE/context';
if (process.env.NODE_ENV === 'production') {
    // 只在产品上出现的操作
}
// const queryClient = new QueryClient({
//     defaultOptions: {
//         queries: {
//             useErrorBoundary: true,
//             refetchOnWindowFocus: false,
//             retry(failureCount, error) {
//                 if (error.status === 404) return false;
//                 if (failureCount < 2) return true;
//                 return false;
//             },
//         },
//     },
// });

function render(Comp) {
    ReactDOM.render(
        <AppProviders>
            <Comp />
        </AppProviders>,
        document.getElementById('app')
    );
}
// function render(Comp) {
//     ReactDOM.render(
//         <QueryClientProvider client={queryClient}>
//             <Comp />
//             <ReactQueryDevtools initialIsOpen={false} />
//         </QueryClientProvider>,
//         document.getElementById('app')
//     );
// }
render(App);

if (module.hot) {
    module.hot.accept('@FE/App', () => {
        const NextApp = require('@FE/App');
        render(NextApp);
    });
}
