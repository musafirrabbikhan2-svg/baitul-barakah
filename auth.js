/* =========================================================
   জিমেইল সাইন-ইন সিস্টেম
   - AUTH_CONFIG.GOOGLE_CLIENT_ID খালি থাকলে বাটনই দেখাবে না (সাইট স্বাভাবিকভাবে চলবে)
   - লগইন করলে নাম/ছবি header এ দেখাবে
   - AUTH_CONFIG.VISITOR_LOG_URL দেওয়া থাকলে সেই লগইনের তথ্য Google Sheet এ যোগ হবে
   ========================================================= */

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window.atob(base64).split('').map(c => '%' + ('0' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
  );
  return JSON.parse(jsonPayload);
}

function baitulLogout() {
  localStorage.removeItem('loggedInUser');
  const dashboard = document.getElementById('navUserDashboard');
  const authBox = document.getElementById('navAuthContainer');
  if (dashboard) dashboard.style.display = 'none';
  if (authBox) authBox.style.display = 'block';
}

function baitulShowDashboard(user) {
  const authBox = document.getElementById('navAuthContainer');
  const dashboard = document.getElementById('navUserDashboard');
  if (!dashboard) return;
  if (authBox) authBox.style.display = 'none';
  dashboard.style.display = 'flex';
  const nameEl = document.getElementById('navUserName');
  const avatarEl = document.getElementById('navUserAvatar');
  if (nameEl) nameEl.innerText = user.name.split(' ')[0];
  if (avatarEl) avatarEl.src = user.picture;
}

function baitulLogVisitor(user) {
  if (!AUTH_CONFIG.VISITOR_LOG_URL) return; // লিংক বসানো না থাকলে কিছুই পাঠানো হবে না
  const params = new URLSearchParams({
    name: user.name,
    email: user.email,
    time: new Date().toLocaleString('bn-BD')
  });
  // no-cors + GET ব্যবহার করা হয়েছে যাতে অন্য ডোমেইনের Apps Script এ কোনো বাধা ছাড়াই পাঠানো যায়
  fetch(AUTH_CONFIG.VISITOR_LOG_URL + '?' + params.toString(), { mode: 'no-cors' }).catch(() => {});
}

function handleCredentialResponse(response) {
  const payload = parseJwt(response.credential);
  const userData = {
    name: payload.name,
    email: payload.email,
    picture: payload.picture
  };
  localStorage.setItem('loggedInUser', JSON.stringify(userData));
  baitulShowDashboard(userData);
  baitulLogVisitor(userData);
}

function baitulInitAuth() {
  if (!AUTH_CONFIG.GOOGLE_CLIENT_ID) return; // Client ID বসানো না থাকলে বাটন দেখানো হবে না

  const wrapper = document.getElementById('nav-auth-slot');
  if (!wrapper) return;

  wrapper.innerHTML = `
    <div class="nav-auth-wrapper">
      <div id="navAuthContainer">
        <div id="g_id_onload"
             data-client_id="${AUTH_CONFIG.GOOGLE_CLIENT_ID}"
             data-callback="handleCredentialResponse">
        </div>
        <div class="g_id_signin" data-type="standard" data-shape="pill" data-theme="outline" data-text="signin_with" data-size="medium" data-logo_alignment="left"></div>
      </div>
      <div id="navUserDashboard" class="nav-user-box" style="display:none;">
        <img id="navUserAvatar" src="" alt="ছবি">
        <span id="navUserName"></span>
        <button onclick="baitulLogout()" class="mini-logout">✕</button>
      </div>
    </div>`;

  if (window.google && window.google.accounts) {
    google.accounts.id.initialize({
      client_id: AUTH_CONFIG.GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      wrapper.querySelector('.g_id_signin'),
      { type: 'standard', shape: 'pill', theme: 'outline', text: 'signin_with', size: 'medium' }
    );
  }

  const saved = localStorage.getItem('loggedInUser');
  if (saved) baitulShowDashboard(JSON.parse(saved));
}

window.addEventListener('load', baitulInitAuth);
