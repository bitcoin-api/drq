# drq

[![npm version](https://badge.fury.io/js/drf.svg)](https://badge.fury.io/js/drf)

drq - Do Redis Queue Function


## About

Do Asynchronous Operation in Queue Using Redis


## Set Up
`process.env.REDIS_URL` needs to be set to your Redis URL


## Example

```.js
'use strict';

// assumes process.env.REDIS_URL is your Redis URL

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