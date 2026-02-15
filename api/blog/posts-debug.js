// Debug API endpoint to check what's wrong
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
            hasKV_URL: !!process.env.KV_URL,
            hasKV_REST_API_URL: !!process.env.KV_REST_API_URL,
            hasKV_REST_API_TOKEN: !!process.env.KV_REST_API_TOKEN,
            hasKV_REST_API_READ_ONLY_TOKEN: !!process.env.KV_REST_API_READ_ONLY_TOKEN,
            nodeVersion: process.version,
            method: req.method
        };

        // Try to import @vercel/kv
        let kvStatus = 'not installed';
        try {
            const { kv } = await import('@vercel/kv');
            kvStatus = 'installed';
            
            // Try to connect
            try {
                const testData = await kv.get('blog-posts');
                envCheck.kvConnection = 'success';
                envCheck.currentData = testData ? `${testData.length} posts` : 'empty';
            } catch (kvError) {
                envCheck.kvConnection = 'failed';
                envCheck.kvError = kvError.message;
            }
        } catch (importError) {
            envCheck.importError = importError.message;
        }

        envCheck.kvPackage = kvStatus;

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
