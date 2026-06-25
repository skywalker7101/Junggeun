// ===== AUTH STATE =====
let currentUser = null;
let currentUserProfile = null;

// authReady Promise — resolves once Firebase tells us the auth state
let _authReadyResolve;
const authReady = new Promise(r => { _authReadyResolve = r; });

document.addEventListener('DOMContentLoaded', () => {
  if (typeof firebase === 'undefined') return;

  firebase.auth().onAuthStateChanged(async user => {
    currentUser = user;
    if (user) {
      try {
        const doc = await firebase.firestore().collection('users').doc(user.uid).get();
        if (doc.exists) {
          currentUserProfile = { uid: user.uid, ...doc.data() };
        } else {
          // 문서 없으면 자동 생성 (Google 로그인 등)
          const profile = { name: user.displayName || '', email: user.email || '', phone: '', role: 'user', freeMinutes: 10, createdAt: firebase.firestore.FieldValue.serverTimestamp() };
          await firebase.firestore().collection('users').doc(user.uid).set(profile);
          currentUserProfile = { uid: user.uid, ...profile };
        }
      } catch { currentUserProfile = { uid: user.uid, name: user.displayName, email: user.email }; }
    } else {
      currentUserProfile = null;
    }
    _authReadyResolve(user);
    updateNavAuth();
  });
});

function isLoggedIn() { return !!currentUser; }

async function logout() {
  await firebase.auth().signOut();
  showToast('로그아웃 되었습니다.', 'success');
  setTimeout(() => location.href = 'index.html', 800);
}

function requireLogin(redirect) {
  if (!currentUser) {
    sessionStorage.setItem('ycall_redirect', redirect || location.href);
    location.href = 'auth.html';
    return false;
  }
  return true;
}

// ===== NAV =====
function updateNavAuth() {
  const loginBtn  = document.getElementById('nav-login-btn');
  const signupBtn = document.getElementById('nav-signup-btn');
  const userMenu  = document.getElementById('nav-user-menu');
  const userName  = document.getElementById('nav-user-name');
  if (!loginBtn) return;
  if (currentUser) {
    loginBtn.classList.add('hidden');
    signupBtn.classList.add('hidden');
    userMenu.classList.remove('hidden');
    if (userName) userName.textContent = (currentUserProfile?.name || currentUser.displayName || '사용자');
  } else {
    loginBtn.classList.remove('hidden');
    signupBtn.classList.remove('hidden');
    userMenu.classList.add('hidden');
  }
}

function renderNavbar(activePage) {
  const nav = document.getElementById('main-navbar');
  if (!nav) return;
  nav.innerHTML = `
    <div class="container">
      <div class="navbar-inner">
        <a href="index.html" class="logo">
          <div class="logo-icon">📞</div>Y-Call
        </a>
        <nav class="nav-links">
          <a href="experts.html" class="nav-link ${activePage==='experts'?'active':''}">전문가 찾기</a>
          <a href="register-expert.html" class="nav-link ${activePage==='register'?'active':''}">전문가 등록</a>
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
    </div>`;
  updateNavAuth();
}

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
        <div class="footer-section"><h5>서비스</h5><div class="footer-links">
          <a href="experts.html" class="footer-link">전문가 찾기</a>
          <a href="register-expert.html" class="footer-link">전문가 등록</a>
          <a href="#" class="footer-link">이용 방법</a>
          <a href="#" class="footer-link">요금 안내</a>
        </div></div>
        <div class="footer-section"><h5>고객지원</h5><div class="footer-links">
          <a href="#" class="footer-link">자주 묻는 질문</a>
          <a href="#" class="footer-link">1:1 문의</a>
          <a href="#" class="footer-link">공지사항</a>
          <a href="terms.html" class="footer-link">이용약관</a>
        </div></div>
        <div class="footer-section"><h5>회사</h5><div class="footer-links">
          <a href="#" class="footer-link">회사 소개</a>
          <a href="#" class="footer-link">채용</a>
          <a href="privacy.html" class="footer-link">개인정보처리방침</a>
          <a href="#" class="footer-link">블로그</a>
        </div></div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Y-Call Inc. All rights reserved.</span>
        <span>📞 고객센터: 1588-0000 (평일 09:00~18:00)</span>
      </div>
    </div>`;
}

// ===== UTILS =====
function renderStars(rating, max=5) {
  let h='';
  for(let i=1;i<=max;i++) h += i<=Math.round(rating)?'★':'☆';
  return h;
}
function formatPrice(n) { return n.toLocaleString('ko-KR'); }

function showToast(message, type='success') {
  let c = document.getElementById('toast-container');
  if (!c) { c=document.createElement('div'); c.id='toast-container'; document.body.appendChild(c); }
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<span>${type==='success'?'✅':'❌'}</span><span>${message}</span>`;
  c.appendChild(t);
  setTimeout(()=>{ t.style.opacity='0'; t.style.transform='translateX(100%)'; t.style.transition='all .3s'; setTimeout(()=>t.remove(),300); }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  renderNavbar(page);
  renderFooter();
});
