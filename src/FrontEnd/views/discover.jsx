/* eslint-disable no-nested-ternary */
import { jsx } from '@emotion/react';
import React from 'react';

import Tooltip from '@reach/tooltip';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { Input, BookListUL, Spinner } from '@FE/components/lib';
import { BookRow } from '@FE/components/book-row';
import { client } from '@FE/utils/api-client';
import * as colors from '@FE/styles/colors';
import { useAsync } from '@FE/utils/hooks';

function DiscoverBooksScreen() {
    const { data, error, run, isLoading, isError, isSuccess } = useAsync();
    const [query, setQuery] = React.useState();
    const [queried, setQueried] = React.useState(false);

    React.useEffect(() => {
        if (!queried) {
            return;
        }
        run(client(`books?query=${encodeURIComponent(query)}`));
    }, [query, queried, run]);
    function handleSearchSubmit(event) {
        event.preventDefault();
        setQueried(true);
        setQuery(event.target.elements.search.value);
    }

    return (
        <div
            css={{
                maxWidth: 800,
                margin: 'auto',
                width: '90vw',
                padding: '40px 0',
            }}
        >
            <form onSubmit={handleSearchSubmit}>
                <Input
                    placeholder="Search books..."
                    id="search"
                    css={{ width: '100%' }}
                />
                <Tooltip label="Search Books">
                    <label htmlFor="search">
                        <button
                            type="submit"
                            css={{
                                border: '0',
                                position: 'relative',
                                marginLeft: '-35px',
                                background: 'transparent',
                            }}
                        >
                            {isLoading ? (
                                <Spinner />
                            ) : isError ? (
                                <FaTimes
                                    aria-label="error"
                                    css={{ color: colors.danger }}
                                />
                            ) : (
                                <FaSearch aria-label="search" />
                            )}
                        </button>
                    </label>
                </Tooltip>
            </form>

            {isError ? (
                <div css={{ color: colors.danger }}>
                    <p>There was an error:</p>
                    <pre>{error.message}</pre>
                </div>
            ) : null}

            {isSuccess ? (
                data?.books?.length ? (
                    <BookListUL css={{ marginTop: 20 }}>
                        {data.books.map((book) => (
                            <li key={book.id} aria-label={book.title}>
                                <BookRow key={book.id} book={book} />
                            </li>
                        ))}
                    </BookListUL>
                ) : (
                    <p>No books found. Try another search.</p>
                )
            ) : null}
        </div>
    );
}

export { DiscoverBooksScreen };