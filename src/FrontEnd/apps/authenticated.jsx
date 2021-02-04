/* eslint-disable no-nested-ternary */
import { jsx } from '@emotion/react';
import React from 'react';

import Tooltip from '@reach/tooltip';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { Button } from '@FE/components/lib';

import * as colors from '@FE/styles/colors';
import * as mq from '@FE/styles/media-queries';

import { DiscoverBooksScreen } from '@FE/views/discover';
function AuthenticatedApp({ user, logout }) {
    return (
        <React.Fragment>
            <div
                css={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                }}
            >
                {user.username}
                <Button
                    variant="secondary"
                    css={{ marginLeft: '10px' }}
                    onClick={logout}
                >
                    Logout
                </Button>
            </div>
            <div
                css={{
                    margin: '0 auto',
                    padding: '4em 2em',
                    maxWidth: '840px',
                    width: '100%',
                    display: 'grid',
                    gridGap: '1em',
                    gridTemplateColumns: '1fr 3fr',
                    [mq.small]: {
                        gridTemplateColumns: '1fr',
                        gridTemplateRows: 'auto',
                        width: '100%',
                    },
                }}
            >
                <DiscoverBooksScreen />
            </div>
        </React.Fragment>
    );
}

export { AuthenticatedApp };
