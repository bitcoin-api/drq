'use strict';

const logDoRedisRequest = !!process.env.LOG_DO_REDIS_REQUEST;


module.exports = Object.freeze( async ({

    client,
    command,
    redisArguments = []

}) => {

    if( logDoRedisRequest ) {

        console.log(
            'Doing Redis Request:',
            JSON.stringify(
                {
                    command,
                    redisArguments
                }, null, 4
            )
        );
    }

    return await new Promise( ( resolve, reject ) => {

        const callback = ( err, redisResponse ) => {

            if( !!err ) {

                console.log(
                    'Error in Redis Request:',
                    err
                );

                return reject( err );
            }

            if( logDoRedisRequest ) {

                console.log(
                    'Redis Request with the following args successful:',
                    JSON.stringify({
                        command,
                        redisArguments
                    }, null, 4 ),
                    'here is the redis response:',
                    redisResponse
                );
            }

            resolve( redisResponse );
        };
        
        client[ command ]( ...redisArguments, callback );
    });
});
