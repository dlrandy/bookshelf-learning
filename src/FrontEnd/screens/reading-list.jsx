import * as React from 'react';
import { Link } from '@FE/components/lib';
import { ListItemList } from '@FE/components/list-item-list';

function ReadingListScreen({ user }) {
    return (
        <ListItemList
            user={user}
            filterListItems={(li) => !li.finishDate}
            noListItems={
                <p>
                    Hey there! Welcome to your bookshelf reading list. Get
                    started by heading over to{' '}
                    <Link to="/discover">the Discover page</Link> to add books
                    to your list.
                </p>
            }
            noFilteredListItems={
                <p>
                    Looks like you've finished all your books! Check them out in
                    your <Link to="/finished">finished books</Link> or{' '}
                    <Link to="/discover">discover more</Link>.
                </p>
            }
        />
    );
}

export { ReadingListScreen };
