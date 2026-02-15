// Debug API endpoint to check Redis connection
const { getRedisClient } = require('../../lib/redis');

export default async function handler(req, res) {
    try {
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        // Check environment variables
        const envCheck = {
            hasREDIS_URL: !!process.env.REDIS_URL,
            redisUrlFormat: process.env.REDIS_URL ? 'configured' : 'missing',
            nodeVersion: process.version,
            method: req.method
        };

        // Try to connect to Redis
        let redisStatus = 'not tested';
        try {
            const redis = getRedisClient();
            redisStatus = 'client created';
            
            // Try to connect and ping
            try {
                await redis.connect().catch(() => {}); // Connect if not connected
                const pingResult = await redis.ping();
                envCheck.redisConnection = 'success';
                envCheck.pingResult = pingResult;
                
                // Try to get data
                const testData = await redis.get('blog-posts');
                envCheck.currentData = testData ? `${JSON.parse(testData).length} posts` : 'empty';
            } catch (redisError) {
                envCheck.redisConnection = 'failed';
                envCheck.redisError = redisError.message;
            }
        } catch (importError) {
            envCheck.importError = importError.message;
        }

        envCheck.redisPackage = redisStatus;

        return res.status(200).json({
            status: 'debug',
            environment: envCheck,
            message: 'Check this info to fix the 500 error'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            stack: error.stack
        });
    }
}
