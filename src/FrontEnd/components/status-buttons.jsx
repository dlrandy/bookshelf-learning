/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import * as React from 'react';
import {
    FaCheckCircle,
    FaPlusCircle,
    FaMinusCircle,
    FaBook,
    FaTimesCircle,
} from 'react-icons/fa';
import Tooltip from '@reach/tooltip';
import {
    useListItem,
    useUpdateListItem,
    useCreateListItem,
    useRemoveListItem,
} from '@FE/utils/list-items';
import { useAsync } from '@FE/utils/hooks';
import * as colors from '@FE/styles/colors';
import { CircleButton, Spinner } from '@FE/components/lib';

function TooltipButton({ label, highlight, onClick, icon, ...rest }) {
    const { isLoading, isError, error, run } = useAsync();

    function handleClick() {
        run(onClick());
    }

    return (
        <Tooltip label={isError ? error.message : label}>
            <CircleButton
                css={{
                    backgroundColor: 'white',
                    ':hover,:focus': {
                        color: isLoading
                            ? colors.gray80
                            : isError
                            ? colors.danger
                            : highlight,
                    },
                }}
                disabled={isLoading}
                onClick={handleClick}
                aria-label={isError ? error.message : label}
                {...rest}
            >
                {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
            </CircleButton>
        </Tooltip>
    );
}

function StatusButtons({ user, book }) {
    const listItem = useListItem(book.id);
    const [update] = useUpdateListItem({
        throwOnError: true,
    });
    const [remove] = useRemoveListItem({
        throwOnError: true,
    });
    const [create] = useCreateListItem({
        throwOnError: true,
    });

    return (
        <React.Fragment>
            {listItem ? (
                listItem.finishDate ? (
                    <TooltipButton
                        label="Unmark as read"
                        highlight={colors.yellow}
                        onClick={() =>
                            update({ id: listItem.id, finishDate: null })
                        }
                        icon={<FaBook />}
                    />
                ) : (
                    <TooltipButton
                        label="Mark as read"
                        highlight={colors.green}
                        onClick={() =>
                            update({ id: listItem.id, finishDate: Date.now() })
                        }
                        icon={<FaCheckCircle />}
                    />
                )
            ) : null}
            {listItem ? (
                <TooltipButton
                    label="Remove from list"
                    highlight={colors.danger}
                    onClick={() => remove({ id: listItem.id })}
                    icon={<FaMinusCircle />}
                />
            ) : (
                <TooltipButton
                    label="Add to list"
                    highlight={colors.indigo}
                    onClick={() => create({ bookId: book.id })}
                    icon={<FaPlusCircle />}
                />
            )}
        </React.Fragment>
    );
}

export { StatusButtons };