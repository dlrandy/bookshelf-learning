/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
import { useQuery, useMutation, queryCache } from 'react-query';
import { setQueryDataForBook } from '@FE/utils/books';
import { useClient } from '@FE/context/auth-context';
function useListItems() {
    const client = useClient();

    const { data: listItems } = useQuery({
        queryKey: 'list-items',
        queryFn: () => client(`list-items`).then((data) => data.listItems),
        config: {
            onSuccess(listItems) {
                for (const listItem of listItems) {
                    setQueryDataForBook(listItem.book);
                }
            },
        },
    });
    return listItems ?? [];
}

function useListItem(bookId) {
    const listItems = useListItems();
    return listItems.find((li) => li.bookId === bookId) ?? null;
}

const defaultMutationOptions = {
    onError: (err, variables, recover) =>
        typeof recover === 'function' ? recover() : null,
    onSettled: () => queryCache.invalidateQueries('list-items'),
};

function useUpdateListItem(options) {
    const client = useClient();
    return useMutation(
        (updates) =>
            client(`list-items/${updates.id}`, {
                method: 'PUT',
                data: updates,
            }),
        {
            onMutate(newItem) {
                const previousItems = queryCache.getQueryData('list-items');

                queryCache.setQueryData('list-items', (old) =>
                    old.map((item) =>
                        item.id === newItem.id ? { ...item, ...newItem } : item
                    )
                );

                return () =>
                    queryCache.setQueryData('list-items', previousItems);
            },
            ...defaultMutationOptions,
            ...options,
        }
    );
}

function useRemoveListItem(options) {
    const client = useClient();
    return useMutation(
        ({ id }) => client(`list-items/${id}`, { method: 'DELETE' }),
        {
            onMutate(removedItem) {
                const previousItems = queryCache.getQueryData('list-items');

                queryCache.setQueryData('list-items', (old) =>
                    old.filter((item) => item.id !== removedItem.id)
                );

                return () =>
                    queryCache.setQueryData('list-items', previousItems);
            },
            ...defaultMutationOptions,
            ...options,
        }
    );
}

function useCreateListItem(options) {
    const client = useClient();
    return useMutation(
        ({ bookId }) => client(`list-items`, { data: { bookId } }),
        { ...defaultMutationOptions, ...options }
    );
}

export {
    useListItem,
    useListItems,
    useUpdateListItem,
    useRemoveListItem,
    useCreateListItem,
};
