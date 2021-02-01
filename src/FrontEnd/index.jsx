import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

if (process.env.NODE_ENV === 'production') {
    // 只在产品上出现的操作
}

ReactDOM.render(<App />, document.getElementById('app'));
if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App');
        ReactDOM.render(<NextApp />, document.getElementById('root'));
    });
}
