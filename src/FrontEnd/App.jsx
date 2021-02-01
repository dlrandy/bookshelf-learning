import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Logo } from '@FE/components/logo';

function App() {
    return (
        <div>
            <Logo width="80" height="80" />
            <h1>Bookshelf</h1>
            <div>
                <button type="button" onClick={() => alert('login clicked')}>
                    Login
                </button>
            </div>
            <div>
                <button type="button" onClick={() => alert('register clicked')}>
                    Register
                </button>
            </div>
        </div>
    );
}
export default hot(App);
