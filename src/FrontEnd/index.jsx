import 'react-hot-loader';
import '@FE/bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '@FE/App';
import { loadDevTools } from '@FE/dev-tools/load';

if (process.env.NODE_ENV === 'production') {
    // 只在产品上出现的操作
}

function render(Comp) {
    loadDevTools(() => {
        ReactDOM.render(<Comp />, document.getElementById('app'));
    });
}
render(App);

if (module.hot) {
    module.hot.accept('@FE/App', () => {
        const NextApp = require('@FE/App');
        render(NextApp);
    });
}
