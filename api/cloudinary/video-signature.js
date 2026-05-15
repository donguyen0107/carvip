const crypto = require('crypto');

function parseAdminToken(authHeader) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.slice(7).trim();
    if (!token) return null;

    try {
        const decoded = Buffer.from(token, 'base64').toString('utf8');
        const [username, issuedAtRaw] = decoded.split(':');
        const issuedAt = Number(issuedAtRaw);

        if (!username || !Number.isFinite(issuedAt)) {
            return null;
        }

        if (Date.now() - issuedAt > 7 * 24 * 60 * 60 * 1000) {
            return null;
        }

        return { username, issuedAt };
    } catch (error) {
        return null;
    }
}

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Cache-Control', 'no-store');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const session = parseAdminToken(req.headers.authorization || '');
    const expectedUsername = process.env.ADMIN_USERNAME || 'admin';

    if (!session || session.username !== expectedUsername) {
        return res.status(401).json({
            success: false,
            message: 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn.'
        });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'djl2iqba5';
    const apiKey = process.env.CLOUDINARY_API_KEY || '757436475645599';
    const apiSecret = process.env.CLOUDINARY_API_SECRET || 'UdZ7bVgoAxafKjo-WVMLzOLGT9E';

    if (!cloudName || !apiKey || !apiSecret) {
        return res.status(500).json({
            success: false,
            message: 'Thiếu cấu hình Cloudinary trên server.'
        });
    }

    const folder = process.env.CLOUDINARY_VIDEO_FOLDER || 'bookcarvip/blog/videos';
    const timestamp = Math.floor(Date.now() / 1000);
    const paramsToSign = `folder=${folder}&resource_type=video&timestamp=${timestamp}`;
    const signature = crypto
        .createHash('sha1')
        .update(paramsToSign + apiSecret)
        .digest('hex');

    return res.status(200).json({
        success: true,
        cloudName,
        apiKey,
        folder,
        resourceType: 'video',
        timestamp,
        signature
    });
};
