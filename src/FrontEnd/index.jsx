import 'react-hot-loader';
import '@FE/bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '@FE/App';

if (process.env.NODE_ENV === 'production') {
    // 只在产品上出现的操作
}

ReactDOM.render(<App />, document.getElementById('app'));
if (module.hot) {
    module.hot.accept('@FE/App', () => {
        const NextApp = require('@FE/App');
        ReactDOM.render(<NextApp />, document.getElementById('root'));
    });
}
