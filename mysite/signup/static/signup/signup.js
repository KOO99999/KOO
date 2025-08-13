// 회원가입 전용 JS
document.addEventListener('DOMContentLoaded', () => {
let users = JSON.parse(localStorage.getItem('users')||'[]');
let currentUser = JSON.parse(localStorage.getItem('currentUser')||'null');

(function fillBirthSelects(){
  const y = document.getElementById('birthYear');
  const m = document.getElementById('birthMonth');
  const d = document.getElementById('birthDay');
  if (!y || !m || !d) return;
  const now = new Date().getFullYear();
  for (let i = now; i >= 1930; i--) { const o = document.createElement('option'); o.value = o.textContent = i; y.appendChild(o);}
  for (let i = 1; i <= 12; i++) { const o = document.createElement('option'); o.value = String(i).padStart(2,'0'); o.textContent = i; m.appendChild(o);}
  for (let i = 1; i <= 31; i++) { const o = document.createElement('option'); o.value = String(i).padStart(2,'0'); o.textContent = i; d.appendChild(o);}
})();

document.getElementById('signupForm')?.addEventListener('submit', e=>{
  e.preventDefault();
  const id = document.getElementById('signupId').value.trim();
  const pw = document.getElementById('signupPw').value.trim();
  if(!id||!pw) return alert('아이디/비밀번호를 입력하세요.');
  if(users.some(u=>u.id===id)) return alert('이미 존재하는 아이디입니다.');

  const gender = [...document.querySelectorAll('input[name="gender"]')].find(x=>x.checked)?.value||'';
  const y = document.getElementById('birthYear')?.value || '';
  const m = document.getElementById('birthMonth')?.value || '';
  const d = document.getElementById('birthDay')?.value || '';
  const birthdate = [y,m,d].filter(Boolean).join('-');
  const address = document.getElementById('address')?.value.trim() || '';
  const mbti = document.getElementById('mbtiSelect')?.value || '';

  const newUser = { id,pw,gender,birthdate,address,mbti,hobbies:[],hobbyCompleted:false,chosenHobby:'',crewChoice:null };
  users.push(newUser);
  currentUser = newUser;
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  alert('회원가입 성공! 취미 설정 페이지로 이동합니다.');
  window.location.href = "/signup/hobby/";  // 취미 페이지 URL
});
});


