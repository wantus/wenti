#!/usr/bin/env python3
import json, urllib.request, os

APP_KEY = os.environ.get('DINGTALK_APP_KEY', 'ding7fv51jeosen3bjap')
APP_SECRET = os.environ.get('DINGTALK_APP_SECRET', 'TwxHB2mpBUrnAi5N7L9CGLDWNGpavFjeLhiUPetJlbkZbBf7x0nNHlUmThnebpHv')
UNION_ID = 'tdNRTpKzlkOW3iShbstiP0eQiEiE'
SHEET_ID = 'hERWDMS'

BASES = {
    'notice': 'MyQA2dXW7Zj9lbyntdjrkrm08zlwrZgb',
    'members': '4lgGw3P8vzZva9bKHnNYvA9l85daZ90D',
    'gallery': 'wva2dxOW430Klr7ZcnDbAgpK8bkz3BRL',
    'log': '1zknDm0WR2x3qbG5IdyDBReOWBQEx5rG'
}

def get_token():
    req = urllib.request.Request(
        'https://api.dingtalk.com/v1.0/oauth2/accessToken',
        data=json.dumps({'appKey': APP_KEY, 'appSecret': APP_SECRET}).encode(),
        headers={'Content-Type': 'application/json'}, method='POST')
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())['accessToken']

def list_records(token, base_id):
    req = urllib.request.Request(
        f'https://api.dingtalk.com/v1.0/notable/bases/{base_id}/sheets/{SHEET_ID}/records/list?operatorId={UNION_ID}',
        data=json.dumps({'maxResults': 100}).encode(),
        headers={'x-acs-dingtalk-access-token': token, 'Content-Type': 'application/json'},
        method='POST')
    with urllib.request.urlopen(req) as r:
        data = json.loads(r.read())
    records = data.get('records', [])
    return [rec['fields'] for rec in records if len(rec.get('fields', {})) > 1]

def main():
    token = get_token()
    result = {}
    for name, base_id in BASES.items():
        result[name] = list_records(token, base_id)
        print(f'{name}: {len(result[name])} 条记录')
    
    with open('data.json', 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print('data.json 生成完成')

if __name__ == '__main__':
    main()
#（注：内容由AI生成）
