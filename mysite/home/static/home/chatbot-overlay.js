(function(){
  const overlay = document.getElementById('chatbotOverlay');
  const openBtn = document.getElementById('openChatbot');
  const closeBtn = document.getElementById('cb-close');
  const resetBtn = document.getElementById('cb-reset');

  const hasParam = () => new URL(location.href).searchParams.get('chatbot') === '1';
  const pushParam = () => {
    const u = new URL(location.href);
    u.searchParams.set('chatbot','1');
    history.pushState({chatbot:1}, '', u);
  };
  const removeParam = () => {
    const u = new URL(location.href);
    if (u.searchParams.has('chatbot')) {
      u.searchParams.delete('chatbot');
      history.replaceState({}, '', u);
    }
  };

  function openOverlay(push=true){
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (push) pushParam();
  }
  function closeOverlay(){
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    removeParam();
    if (typeof resetChat === 'function') resetChat(); // 닫힐 때 초기화
  }

  // FAB 클릭 → SPA로 열기
  openBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    openOverlay(true);
  });

  closeBtn?.addEventListener('click', closeOverlay);

  // 배경 클릭 시 닫기
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closeOverlay();
  });

  // 뒤/앞 이동 시 동기화
  window.addEventListener('popstate', () => {
    hasParam() ? openOverlay(false) : closeOverlay();
  });

  // URL에 ?chatbot=1 로 들어오면 자동 오픈
  if (hasParam()) openOverlay(false);

  // 리셋 버튼 (쓰레기통)
  resetBtn?.addEventListener('click', () => {
    if (typeof resetChat === 'function') resetChat();
  });

  // 안전망: 초기엔 입력 잠금
  if (typeof setInputEnabled === 'function') setInputEnabled(false);
})();
