// 配置文件 - 从本地 data.json 读取数据（由 GitHub Actions 每10分钟自动更新）
const DINGTALK_CONFIG = {
  bases: {
    notice: 'notice',
    members: 'members',
    gallery: 'gallery',
    log: 'log'
  }
};

let _data = null;

async function fetchRecords(type) {
  if (!_data) {
    const res = await fetch('data.json?t=' + Date.now());
    _data = await res.json();
  }
  return _data[type] || [];
}
//（注：内容由AI生成）
