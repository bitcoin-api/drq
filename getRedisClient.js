'use strict';

const redis = require( 'redis' );


module.exports = Object.freeze( ({

    url = process.env.REDIS_URL

} = { url: process.env.REDIS_URL }) => {

    const redisClient = redis.createClient({

        url
    });

    return redisClient;
});
