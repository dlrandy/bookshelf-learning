/** @jsx jsx */
import { jsx } from '@emotion/react';

import { Link } from '@FE/components/lib';

function NotFoundScreen() {
    return (
        <div
            css={{
                height: '100%',
                display: 'grid',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div>
                Sorry... nothing here. <Link to="/list">Go home</Link>
            </div>
        </div>
    );
}

export { NotFoundScreen };
