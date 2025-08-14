let activeMode = null; // 'geo' | 'chat' | null

function scrollToBottom(smooth=false){
  const chat = document.getElementById('chat-body');
  if (!chat) return;
  chat.scrollTop = chat.scrollHeight;
  const last = chat.lastElementChild;
  if(last){ last.scrollIntoView({behavior: smooth ? 'smooth' : 'auto', block: 'end'}); }
  requestAnimationFrame(()=> {
    chat.scrollTop = chat.scrollHeight;
    if(last){ last.scrollIntoView({behavior: 'auto', block: 'end'}); }
  });
  setTimeout(()=> { chat.scrollTop = chat.scrollHeight; }, 0);
}

function initialChooserHTML(){
  return `시작할 상담 유형을 선택해주세요.
    <div class="chip-row" id="mode-chips">
      <button class="chip" onclick="chooseMode('geo')">위치기반 추천</button>
      <button class="chip" onclick="chooseMode('chat')">챗봇 추천</button>
    </div>`;
}

function setInputEnabled(enabled){
  const input = document.getElementById('chat-input');
  const send = document.getElementById('send-btn');
  const attach = document.getElementById('attach-btn');
  if (!input || !send || !attach) return;

  input.disabled = !enabled;
  input.classList.toggle('input-disabled', !enabled);
  [send, attach].forEach(b => b.classList.toggle('disabled', !enabled));

  input.placeholder = enabled ? 'Type message' : '상담 유형을 먼저 선택하세요';
  if(enabled) input.focus();
}

function addRow({sender, html}){
  const chat = document.getElementById('chat-body');
  if (!chat) return;
  const row = document.createElement('div');
  row.className = `msg ${sender}`;
  if(sender === 'bot'){
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 2a1 1 0 1 1 2 0v1h2.5a2.5 2.5 0 0 1 0 5H14v1h2a3 3 0 0 1 3 3v4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-4a3 3 0 0 1 3-3h2V8H8.5a2.5 2.5 0 1 1 0-5H11V2Z"/></svg>`;
    row.appendChild(avatar);
  }
  const bubble = document.createElement('div');
  bubble.className = `chat-message ${sender === 'bot' ? 'bot-message' : 'user-message'}`;
  bubble.innerHTML = html;
  row.appendChild(bubble);
  chat.appendChild(row);
  scrollToBottom(true);
  return bubble;
}

function addAttachmentPlaceholder(){
  const html = `
    <span class="chat-attachment">
      <span class="thumb">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M11 2a1 1 0 1 1 2 0v1h2.5a2.5 2.5 0 0 1 0 5H14v1h2a3 3 0 0 1 3 3v4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-4a3 3 0 0 1 3-3h2V8H8.5a2.5 2.5 0 1 1 0-5H11V2Z"/>
        </svg>
      </span>
      <span class="label">이미지 첨부</span>
    </span>`;
  addRow({ sender:'user', html });
}

function chooseMode(mode){
  activeMode = mode;
  const chips = document.getElementById('mode-chips');
  if(chips) chips.remove();

  addRow({ sender:'user', html: (mode === 'geo' ? '위치기반 추천을 선택했어요.' : '챗봇 추천을 선택했어요.') });
  setInputEnabled(true);

  typingThenReply(mode === 'geo'
    ? '위치기반 추천을 시작합니다. 현재 위치(또는 여행지 도시/국가)를 알려주세요.'
    : '챗봇 추천을 시작합니다. 어떤 점이 궁금하신가요?');
}

function typingThenReply(text, delay=700){
  const bubble = addRow({ sender:'bot', html:`<span class="typing"><i></i><i></i><i></i></span>` });
  setTimeout(()=>{ if(bubble){ bubble.innerHTML = text; scrollToBottom(true); } }, delay);
}

function sendUser(){
  if(!activeMode) return;
  const input = document.getElementById('chat-input');
  if (!input) return;
  const msg = input.value.trim();
  if(!msg) return;
  addRow({ sender:'user', html: msg });
  input.value = '';

  typingThenReply(activeMode === 'geo'
    ? '확인했습니다. 더 정확한 추천을 위해 이용 시간/예산도 알려주시면 좋아요.'
    : '좋아요. 필요 정보(예산, 기간, 관심사 등)를 조금만 더 알려주세요.');
}

function resetChat(){
  activeMode = null;
  const chat = document.getElementById('chat-body');
  const input = document.getElementById('chat-input');
  if (!chat || !input) return;

  chat.innerHTML = '';
  input.value = '';
  setInputEnabled(false);

  const row = document.createElement('div');
  row.className = 'msg bot';
  row.innerHTML = `
    <div class="avatar" aria-hidden="true">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M11 2a1 1 0 1 1 2 0v1h2.5a2.5 2.5 0 0 1 0 5H14v1h2a3 3 0 0 1 3 3v4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-4a3 3 0 0 1 3-3h2V8H8.5a2.5 2.5 0 1 1 0-5H11V2Z"/>
      </svg>
    </div>
    <div class="chat-message bot-message">
      ${initialChooserHTML()}
    </div>`;
  chat.appendChild(row);
  scrollToBottom(false);
}

document.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.getElementById('send-btn');
  const chatInput = document.getElementById('chat-input');
  const attachBtn = document.getElementById('attach-btn');
  const fileInput = document.getElementById('file-input');

  sendBtn?.addEventListener('click', ()=>{
    if(!sendBtn.classList.contains('disabled')) sendUser();
  });
  chatInput?.addEventListener('keypress', e=>{
    if(e.key === 'Enter'){ e.preventDefault(); if(activeMode) sendUser(); }
  });
  attachBtn?.addEventListener('click', ()=>{
    if(attachBtn.classList.contains('disabled')) return;
    fileInput?.click();
  });
  fileInput?.addEventListener('change', e=>{
    if(!activeMode) return;
    const file = e.target.files && e.target.files[0];
    if(file){ addAttachmentPlaceholder(); e.target.value=''; }
  });

  // 처음 로드 시 입력 잠금 + 시작 메시지 구성
  resetChat();
});
