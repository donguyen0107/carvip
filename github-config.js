// ===== CẤU HÌNH GITHUB =====
// Điền thông tin GitHub của bạn vào đây

const GITHUB_CONFIG = {
    // Bước 1: Điền username GitHub của bạn
    owner: 'donguyen0107',  // ✅ Username GitHub của bạn
    
    // Bước 2: Điền tên repository
    repo: 'carvip',        // ✅ Tên repo trên GitHub
    
    // Bước 3: Branch (mặc định là main)
    branch: 'main',
    
    // Bước 4: Personal Access Token (để có thể sửa bài)
    // ⚠️ KHÔNG điền token trực tiếp vào đây khi commit lên GitHub!
    // Xem hướng dẫn bên dưới để sử dụng token an toàn
    token: ''  // ⚠️ Để trống khi commit, chỉ điền khi dùng local
};

/*
╔════════════════════════════════════════════════════════════╗
║                  HƯỚNG DẪN TẠO GITHUB TOKEN                ║
╚════════════════════════════════════════════════════════════╝

📌 Bước 1: Vào GitHub Settings
   👉 https://github.com/settings/tokens

📌 Bước 2: Click "Generate new token" → "Generate new token (classic)"

📌 Bước 3: Điền thông tin
   - Note: "BOOKCARVIP Blog Editor"
   - Expiration: "No expiration" (hoặc chọn thời gian)
   - Chọn quyền: ✅ repo (full control of private repositories)

📌 Bước 4: Click "Generate token"
   - Copy token (dạng: ghp_xxxxxxxxxxxxx)
   - Dán vào dòng "token: ''" ở trên

📌 Bước 5: Lưu file này

⚠️ LƯU Ý:
   - KHÔNG chia sẻ token với người khác
   - KHÔNG commit token lên GitHub public repo
   - Nếu để trống token → Chỉ xem được, không sửa được

💡 MẸO:
   - Tạo file github-config.local.js (không commit)
   - Copy nội dung file này vào
   - Điền token vào đó
   - Gitignore file .local.js
*/

// Export config
window.GITHUB_CONFIG = GITHUB_CONFIG;
