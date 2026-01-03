// ===== CẤU HÌNH GITHUB - FILE LOCAL (KHÔNG COMMIT) =====
// File này chứa token thật và KHÔNG được commit lên GitHub

const GITHUB_CONFIG = {
    owner: 'donguyen0107',
    repo: 'carvip',
    branch: 'main',
    
    // ⚠️ Token thật - File này được .gitignore bảo vệ
    token: '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'
};

// Export config
window.GITHUB_CONFIG = GITHUB_CONFIG;
