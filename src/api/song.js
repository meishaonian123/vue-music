import axios from 'axios'
import {commonParams} from './config'
export function getLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongVkey(songmid) {
  const url = '/api/getSongVkey'
  const data = Object.assign({}, commonParams, {
    '-': 'getplaysongvkey6405092986456373',
    'g_tk': 5381,
    'sign': 'zzayyk2h6agvhtyr7ecfd2557b5a538109ce7671a46d59d0',
    'loginUin': '972364833',
    'hostUin': 0,
    'format': 'json',
    'inCharset': 'utf8',
    'outCha0rset': 'utf-8',
    'notice': 0,
    'platform': 'yqq.json',
    'needNewCode': 0,
    'data': {
      'req_0': {'module': 'vkey.GetVkeyServer', 'method': 'CgiGetVkey', 'param': {'guid': '2487804162', 'songmid': [`${songmid}`], 'songtype': [0], 'uin': '972364833', 'loginflag': 1, 'platform': '20'}}, 'comm': {'uin': 972364833, 'format': 'json', 'ct': 24, 'cv': 0}}
  })

  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: data
    }).then((res) => { // 成功的回调
      res = res.data
      return Promise.resolve(res.data)
    })
  })
}