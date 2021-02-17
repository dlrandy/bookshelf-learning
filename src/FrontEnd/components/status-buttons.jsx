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
import { trace } from '@FE/components/profiler';

function TooltipButton({ label, highlight, onClick, icon, ...rest }) {
    const { isLoading, isError, error, run, reset } = useAsync();

    function handleClick() {
        if (isError) {
            reset();
        } else {
            trace(`Click ${label}`, performance.now(), () => {
                run(onClick());
            });
        }
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

function StatusButtons({ book }) {
    const listItem = useListItem(book.id);
    const [handleUpdateClick] = useUpdateListItem({
        throwOnError: true,
    });
    const [handleRemoveClick] = useRemoveListItem({
        throwOnError: true,
    });
    const [handleCreateClick] = useCreateListItem({
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
                            handleUpdateClick({
                                id: listItem.id,
                                finishDate: null,
                            })
                        }
                        icon={<FaBook />}
                    />
                ) : (
                    <TooltipButton
                        label="Mark as read"
                        highlight={colors.green}
                        onClick={() =>
                            handleUpdateClick({
                                id: listItem.id,
                                finishDate: Date.now(),
                            })
                        }
                        icon={<FaCheckCircle />}
                    />
                )
            ) : null}
            {listItem ? (
                <TooltipButton
                    label="Remove from list"
                    highlight={colors.danger}
                    onClick={() => handleRemoveClick({ id: listItem.id })}
                    icon={<FaMinusCircle />}
                />
            ) : (
                <TooltipButton
                    label="Add to list"
                    highlight={colors.indigo}
                    onClick={() => handleCreateClick({ bookId: book.id })}
                    icon={<FaPlusCircle />}
                />
            )}
        </React.Fragment>
    );
}

export { StatusButtons };
