// 钉钉后端配置
const DINGTALK_CONFIG = {
  appKey: 'ding7fv51jeosen3bjap',
  appSecret: 'TwxHB2mpBUrnAi5N7L9CGLDWNGpavFjeLhiUPetJlbkZbBf7x0nNHlUmThnebpHv',
  operatorId: 'tdNRTpKzlkOW3iShbstiP0eQiEiE',
  sheetId: 'hERWDMS',
  bases: {
    notice: 'MyQA2dXW7Zj9lbyntdjrkrm08zlwrZgb',
    members: '4lgGw3P8vzZva9bKHnNYvA9l85daZ90D',
    gallery: 'wva2dxOW430Klr7ZcnDbAgpK8bkz3BRL',
    log: '1zknDm0WR2x3qbG5IdyDBReOWBQEx5rG'
  }
};

// CORS 代理（解决浏览器跨域问题）
const PROXY = 'https://corsproxy.io/?url=';

let _token = null;
let _tokenTime = 0;

async function getToken() {
  const now = Date.now();
  if (_token && now - _tokenTime < 7000000) return _token;
  const url = PROXY + encodeURIComponent('https://api.dingtalk.com/v1.0/oauth2/accessToken');
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ appKey: DINGTALK_CONFIG.appKey, appSecret: DINGTALK_CONFIG.appSecret })
  });
  const data = await res.json();
  _token = data.accessToken;
  _tokenTime = now;
  return _token;
}

async function fetchRecords(baseId) {
  const token = await getToken();
  const apiUrl = `https://api.dingtalk.com/v1.0/notable/bases/${baseId}/sheets/${DINGTALK_CONFIG.sheetId}/records/list?operatorId=${DINGTALK_CONFIG.operatorId}`;
  const url = PROXY + encodeURIComponent(apiUrl);
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'x-acs-dingtalk-access-token': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ maxResults: 100 })
  });
  const data = await res.json();
  return (data.records || data.value || []).map(r => r.fields);
}
