import React from 'react';

import { client } from '@FE/utils/api-client';

let queue = [];

setInterval(sendProfileQueue, 5000);

function sendProfileQueue() {
    if (!queue.length) {
        return Promise.resolve({
            success: true,
        });
    }

    const queueToSend = [...queue];
    queue = [];
    return client('profile', {
        data: queueToSend,
    });
}

function Profiler({ metadata, phases, ...props }) {
    function reportProfile(
        id, // the "id" prop of the Profiler tree that has just committed
        phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
        actualDuration, // time spent rendering the committed update
        baseDuration, // estimated time to render the entire subtree without memoization
        startTime, // when React began rendering this update
        commitTime, // when React committed this update
        interactions // the Set of interactions belonging to this update
    ) {
        if (!phases || phases.includes(phase)) {
            queue.push({
                metadata,
                id,
                phase,
                actualDuration,
                baseDuration,
                startTime,
                commitTime,
                interactions: [...interactions],
            });
        }
    }

    return <React.Profiler onRender={reportProfile} {...props} />;
}

export { Profiler };
export {
    unstable_trace as trace,
    unstable_wrap as wrap,
} from 'scheduler/tracing';
