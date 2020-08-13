# Dr. Q

[![npm version](https://badge.fury.io/js/drq.svg)](https://badge.fury.io/js/drq)

<img
    src="https://bitcoin-api.s3.amazonaws.com/images/visual_art/azubuike-drq.png"
    width="300"
/>

### Dr. Q - Do Redis Queue Function


## About

This module is used to perform asynchronous operations in a queue using Redis.

This can be used anywhere across any system that has access your Redis database.

It's useful for scenarios such as preventing simultaneous database updates on the same user. For example, if you use two phones to send a chat message to the same user at the same time, Dr. Q can ensure those operations occur in sequence and in order. To achieve this result of preventing conflicting updates, the send chat message operation can be performed using Dr. Q with the receiving user's ID incorporated in the `queueId`.


## Installation
```
npm install drq --save
```

## Set Up
Your Redis URL can be set using the environment variable `process.env.REDIS_URL`. The default Redis URL is `127.0.0.1:6379`.

The default key for the Redis stream used by Dr. Q for queueing is `Q`, although a custom stream key can be set using the `process.env.DRQ_REDIS_STREAM_KEY` environment variable.

## Settings
Environment variable settings set using `process.env.<environment variable>`
| Environment Variable | Meaning | Default Value |
|---|---|---|
| `DRQ_REDIS_STREAM_KEY` | The key for the Redis stream used by Dr. Q for queueing | `Q` |
| `DRQ_QUEUE_WAIT_TIMEOUT` | Max wait time for the previous operation in queue to finish before throwing a timeout error, in milliseconds | `10000` (10 seconds) |
| `DRQ_OPERATION_TIMEOUT` | Max time allowed for the current operation to finish before throwing a timeout error, in milliseconds | `20000` (20 seconds) |
| `DRQ_PAGINATION_COUNT` | Max number of Redis stream entries to get per iteration in the queue stream query operation | `5000` |
| `MAX_STREAM_LENGTH` | Max number of stream entries in the Dr Q. Redis streams queue | `300000` |

## Example

```.js
'use strict';

const drq = require( 'drq' );


(async () => {

    const drqOperationOne = drq({

        queueId: 'testQueueId',
        operation: () => {
            
            return new Promise( resolve => {

                setTimeout( () => {

                    console.log( 'operation in queue 1' );

                    resolve( 'x' );

                }, 1000 );
            });
        },
    });

    await new Promise( resolve => {

        setTimeout( resolve, 10 );
    });

    const drqOperationTwo = drq({

        queueId: 'testQueueId',
        operation: () => {
            
            return new Promise( resolve => {

                setTimeout( () => {

                    console.log( 'operation in queue 2' );

                    resolve( 'y' );

                }, 1000 );
            });
        },
    });

    const results = await Promise.all([ drqOperationOne, drqOperationTwo ]);

    console.log( 'results:', results[0], results[1] );
})();


/*
    will log after 1 second:

        operation in queue 1

    will log after 2 seconds:

        operation in queue 2
        results: x y
*/
```


### Module Created by [Bitcoin-Api.io](https://bitcoin-api.io)


**Coding:** [Michael Stecky-Efantis](https://www.linkedin.com/in/michael-se) - contact for enterprise collaborations and sponsorships

**Art Design:** [Azubuike Nwadike](https://www.facebook.com/xbilldn) - contact to hire for excellent quality design and art work
