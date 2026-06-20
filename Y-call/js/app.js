// ===== AUTH STATE =====
let currentUser = JSON.parse(localStorage.getItem('ycall_user') || 'null');

function login(userData) {
  currentUser = userData;
  localStorage.setItem('ycall_user', JSON.stringify(userData));
  updateNavAuth();
}

function logout() {
  currentUser = null;
  localStorage.removeItem('ycall_user');
  updateNavAuth();
  showToast('로그아웃 되었습니다.', 'success');
}

function isLoggedIn() { return !!currentUser; }

function requireLogin(redirect) {
  if (!isLoggedIn()) {
    sessionStorage.setItem('ycall_redirect', redirect || location.href);
    location.href = 'auth.html';
    return false;
  }
  return true;
}

// ===== NAV AUTH UI =====
function updateNavAuth() {
  const loginBtn  = document.getElementById('nav-login-btn');
  const signupBtn = document.getElementById('nav-signup-btn');
  const userMenu  = document.getElementById('nav-user-menu');
  const userName  = document.getElementById('nav-user-name');

  if (!loginBtn) return;

  if (isLoggedIn()) {
    loginBtn?.classList.add('hidden');
    signupBtn?.classList.add('hidden');
    userMenu?.classList.remove('hidden');
    if (userName) userName.textContent = currentUser.name;
  } else {
    loginBtn?.classList.remove('hidden');
    signupBtn?.classList.remove('hidden');
    userMenu?.classList.add('hidden');
  }
}

// ===== TOAST =====
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✅' : '❌'}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===== NAVBAR COMMON =====
function renderNavbar(activePage) {
  const nav = document.getElementById('main-navbar');
  if (!nav) return;

  nav.innerHTML = `
    <div class="container">
      <div class="navbar-inner">
        <a href="index.html" class="logo">
          <div class="logo-icon">📞</div>
          Y-Call
        </a>
        <nav class="nav-links">
          <a href="experts.html" class="nav-link ${activePage === 'experts' ? 'active' : ''}">전문가 찾기</a>
          <a href="register-expert.html" class="nav-link ${activePage === 'register' ? 'active' : ''}">전문가 등록</a>
          <a href="#" class="nav-link">이용 방법</a>
        </nav>
        <div class="nav-actions">
          <a href="auth.html" class="btn btn-ghost btn-sm" id="nav-login-btn">로그인</a>
          <a href="auth.html?tab=signup" class="btn btn-primary btn-sm" id="nav-signup-btn">회원가입</a>
          <div class="hidden" id="nav-user-menu" style="display:flex;align-items:center;gap:12px;">
            <a href="dashboard-user.html" class="btn btn-ghost btn-sm">
              <span id="nav-user-name"></span>님
            </a>
            <button class="btn btn-outline btn-sm" onclick="logout()">로그아웃</button>
          </div>
        </div>
      </div>
    </div>
  `;
  updateNavAuth();
}

// ===== FOOTER COMMON =====
function renderFooter() {
  const footer = document.getElementById('main-footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo"><div class="logo-icon">📞</div>Y-Call</div>
          <p>전문가와 바로 통화하세요.<br>법률, 세무, 의료, IT 등 다양한 분야의<br>검증된 전문가가 대기 중입니다.</p>
        </div>
        <div class="footer-section">
          <h5>서비스</h5>
          <div class="footer-links">
            <a href="experts.html" class="footer-link">전문가 찾기</a>
            <a href="register-expert.html" class="footer-link">전문가 등록</a>
            <a href="#" class="footer-link">이용 방법</a>
            <a href="#" class="footer-link">요금 안내</a>
          </div>
        </div>
        <div class="footer-section">
          <h5>고객지원</h5>
          <div class="footer-links">
            <a href="#" class="footer-link">자주 묻는 질문</a>
            <a href="#" class="footer-link">1:1 문의</a>
            <a href="#" class="footer-link">공지사항</a>
            <a href="#" class="footer-link">이용약관</a>
          </div>
        </div>
        <div class="footer-section">
          <h5>회사</h5>
          <div class="footer-links">
            <a href="#" class="footer-link">회사 소개</a>
            <a href="#" class="footer-link">채용</a>
            <a href="#" class="footer-link">개인정보처리방침</a>
            <a href="#" class="footer-link">블로그</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Y-Call Inc. All rights reserved.</span>
        <span>📞 고객센터: 1588-0000 (평일 09:00~18:00)</span>
      </div>
    </div>
  `;
}

// ===== STAR RENDER =====
function renderStars(rating, max = 5) {
  let html = '';
  for (let i = 1; i <= max; i++) {
    html += i <= Math.round(rating) ? '★' : '☆';
  }
  return html;
}

// ===== PRICE FORMAT =====
function formatPrice(n) { return n.toLocaleString('ko-KR'); }

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  renderNavbar(page);
  renderFooter();
});
