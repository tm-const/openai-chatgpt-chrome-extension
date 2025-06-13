// content.js
window.addEventListener('load', () => {
  // 1) Create the “AI Chat” launcher button
  const launcher = document.createElement('button');
  launcher.id = 'ai-launcher';
  launcher.textContent = 'AI Chat';
  Object.assign(launcher.style, {
    position:   'fixed',
    bottom:     '20px',
    right:      '20px',
    padding:    '8px 12px',
    background: '#444654',
    color:      '#fff',
    border:     'none',
    borderRadius: '8px',
    cursor:     'pointer',
    zIndex:     999999
  });
  document.body.appendChild(launcher);

  // 2) Prepare the iframe (but don’t add it yet)
  const iframe = document.createElement('iframe');
  iframe.src = chrome.runtime.getURL('popup/popup.html');
  Object.assign(iframe.style, {
    position:      'fixed',
    top:           '42px',
    right:         '46px',
    width:         '760px',
    height:        '100%',
    border:        '0px',
    borderRadius:  '0px',
    zIndex:        999998,
    display:       'none',
    background:    '#000000'
  });
  document.body.appendChild(iframe);

  // 3) Toggle iframe on launcher click
  launcher.addEventListener('click', () => {
    iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
  });
});
