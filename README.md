'use strict';

// assumes process.env.REDIS_URL is your Redis URL

const drq = require( 'drq' );



(async () => {

    await drq({

        queueId: 'testQueueId',
        doOperation: () => {
            
            return new Promise( resolve => {


                setTimeout( () => {

                    console.log( 'operation in queue 1' );

                    resolve();

                }, 1000 );
            });
        },
    });

    await drq({

        queueId: 'testQueueId',
        doOperation: () => {
            
            return new Promise( resolve => {


                setTimeout( () => {

                    console.log( 'operation in queue 2' );

                    resolve();

                }, 1000 );
            });
        },
    });
})();
