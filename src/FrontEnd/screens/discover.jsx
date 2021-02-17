/* eslint-disable no-nested-ternary */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import * as React from 'react';
import Tooltip from '@reach/tooltip';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useBookSearch, useRefetchBookSearchQuery } from '@FE/utils/books';
import * as colors from '@FE/styles/colors';
import { BookRow } from '@FE/components/book-row';
import { BookListUL, Spinner, Input } from '@FE/components/lib';
import { Profiler } from '@FE/components/profiler';

function DiscoverBooksScreen() {
    const [query, setQuery] = React.useState('');
    const [queried, setQueried] = React.useState(false);
    const { books, error, isLoading, isSuccess, isError } = useBookSearch(
        query
    );
    const refetchBookSearchQuery = useRefetchBookSearchQuery();

    React.useEffect(() => () => refetchBookSearchQuery(), [
        refetchBookSearchQuery,
    ]);

    function handleSearchSubmit(event) {
        event.preventDefault();
        setQueried(true);
        setQuery(event.target.elements.search.value);
    }

    return (
        <div>
            <div>
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
            </div>
            <div>
                {queried ? null : (
                    <div
                        css={{
                            marginTop: 20,
                            fontSize: '1.2em',
                            textAlign: 'center',
                        }}
                    >
                        <p>Welcome to the discover page.</p>
                        <p>Here, let me load a few books for you...</p>
                        {isLoading ? (
                            <div css={{ width: '100%', margin: 'auto' }}>
                                <Spinner />
                            </div>
                        ) : isSuccess && books.length ? (
                            <p>
                                Here you go! Find more books with the search bar
                                above.
                            </p>
                        ) : isSuccess && !books.length ? (
                            <p>
                                Hmmm... I couldn't find any books to suggest for
                                you. Sorry.
                            </p>
                        ) : null}
                    </div>
                )}

                {isSuccess ? (
                    books.length ? (
                        <Profiler
                            id="Discover Books Screen Book List"
                            metadata={{ query, bookCount: books.length }}
                        >
                            <BookListUL css={{ marginTop: 20 }}>
                                {books.map((book) => (
                                    <li key={book.id} aria-label={book.title}>
                                        <BookRow key={book.id} book={book} />
                                    </li>
                                ))}
                            </BookListUL>
                        </Profiler>
                    ) : (
                        <p>No books found. Try another search.</p>
                    )
                ) : null}
            </div>
        </div>
    );
}

export { DiscoverBooksScreen };
