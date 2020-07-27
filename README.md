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


### Credits:

**Coding:** [Michael Stecky-Efantis](https://www.linkedin.com/in/bitcoin-api) - contact for enterprise [Bitcoin-Api.io](https://bitcoin-api.io) Bitcoin and crypto services - add crypto to your business!

**Art Design:** [Azubuike Nwadike](https://www.facebook.com/xbilldn) - contact to hire for excellent quality design and art work
