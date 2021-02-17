/* eslint-disable react/prop-types */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import { useListItems } from '@FE/utils/list-items';
import { BookListUL } from '@FE/components/lib';
import { BookRow } from '@FE/components/book-row';
import { Profiler } from '@FE/components/profiler';

function ListItemList({ filterListItems, noListItems, noFilteredListItems }) {
    const listItems = useListItems();

    const filteredListItems = listItems.filter(filterListItems);

    if (!listItems.length) {
        return (
            <div css={{ marginTop: '1em', fontSize: '1.2em' }}>
                {noListItems}
            </div>
        );
    }
    if (!filteredListItems.length) {
        return (
            <div css={{ marginTop: '1em', fontSize: '1.2em' }}>
                {noFilteredListItems}
            </div>
        );
    }

    return (
        <Profiler
            id="List Item List "
            metadata={{
                listItemCount: filteredListItems.length,
            }}
        >
            <BookListUL>
                {filteredListItems.map((listItem) => (
                    <li key={listItem.id}>
                        <BookRow book={listItem.book} />
                    </li>
                ))}
            </BookListUL>
        </Profiler>
    );
}

export { ListItemList };
