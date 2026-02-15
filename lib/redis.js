// Redis client using ioredis for Vercel serverless
const Redis = require('ioredis');

let redis;

function getRedisClient() {
    if (!redis) {
        // Upstash Redis or any Redis URL
        const redisUrl = process.env.REDIS_URL;
        
        if (!redisUrl) {
            throw new Error('REDIS_URL environment variable is not set');
        }

        redis = new Redis(redisUrl, {
            family: 0, // Use IPv4 and IPv6
            maxRetriesPerRequest: 3,
            enableReadyCheck: false,
            lazyConnect: true,
            retryStrategy(times) {
                const delay = Math.min(times * 50, 2000);
                return delay;
            },
        });

        redis.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });

        redis.on('connect', () => {
            console.log('Redis connected successfully');
        });
    }

    return redis;
}

module.exports = { getRedisClient };
