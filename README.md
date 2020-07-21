# drq
drq - do Redis Queue Function


## About

Do Asynchronous Operation in Queue Using Redis

# Set Up
`process.env.REDIS_URL` needs to be set to your Redis URL

## Example

```.js
'use strict';

const drf = require( 'drf' );


(async () => {

    await drf({

        queueId: 'testQueueId',
        doOperation = () => {
            
            return new Promise( resolve => {


                setTimeout( () => {

                    console.log( 'operation in queue 1' );

                    resolve();

                }, 1000 );
            });
        },
    });

    await drf({

        queueId: 'testQueueId',
        doOperation = () => {
            
            return new Promise( resolve => {


                setTimeout( () => {

                    console.log( 'operation in queue 2' );

                    resolve()

                }, 1000 );
            });
        },
    });
})();

/*
    will log after 1 second:

        operation in queue 1

    will log after 2 seconds:

        operation in queue 2
*/
```