// API endpoint for admin login on Vercel
// Path: /api/admin/login

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            success: false, 
            message: 'Method not allowed' 
        });
    }

    const { username, password, remember } = req.body;

    // Admin credentials (⚠️ In production, use environment variables!)
    const ADMIN_CREDENTIALS = {
        username: process.env.ADMIN_USERNAME || 'admin',
        password: process.env.ADMIN_PASSWORD || 'admin123'
    };

    // Check credentials
    if (username === ADMIN_CREDENTIALS.username && 
        password === ADMIN_CREDENTIALS.password) {
        
        // Create simple token (in production, use JWT)
        const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
        
        return res.status(200).json({ 
            success: true, 
            message: 'Đăng nhập thành công!',
            token: token
        });
    } else {
        return res.status(401).json({ 
            success: false, 
            message: 'Sai tên đăng nhập hoặc mật khẩu!' 
        });
    }
}
