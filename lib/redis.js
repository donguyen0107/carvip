// Redis client using ioredis for Vercel serverless
const Redis = require('ioredis');

// Global Redis instance (reused across function calls in Vercel)
let redis = null;

function getRedisClient() {
    if (!redis) {
        const redisUrl = process.env.REDIS_URL;
        
        if (!redisUrl) {
            throw new Error('REDIS_URL environment variable is not set. Please configure it in Vercel dashboard.');
        }

        console.log('🔌 Initializing Redis connection...');

        redis = new Redis(redisUrl, {
            family: 0, // Support both IPv4 and IPv6
            maxRetriesPerRequest: 3,
            enableReadyCheck: false,
            lazyConnect: false, // Auto-connect immediately
            connectTimeout: 10000,
            retryStrategy(times) {
                if (times > 3) {
                    console.error('❌ Redis retry limit reached');
                    return null; // Stop retrying
                }
                const delay = Math.min(times * 50, 2000);
                console.log(`🔄 Redis retry attempt ${times}, waiting ${delay}ms...`);
                return delay;
            },
        });

        redis.on('error', (err) => {
            console.error('❌ Redis Client Error:', err.message);
        });

        redis.on('connect', () => {
            console.log('✅ Redis connected successfully');
        });

        redis.on('ready', () => {
            console.log('✅ Redis ready to accept commands');
        });
    }

    return redis;
}

module.exports = { getRedisClient };
