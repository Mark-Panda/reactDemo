/**
 * 包含应用中所有的接口请求函数模块
 * 每个函数返回的都是promise
 */

import ajax from './ajax';
const BASE = 'http://39.105.222.70:7001'

 //登录
//  export function reqLogin(username, password) {
//     return ajax('/loginAdmin',{username,password},'POST')
//  }

export const reqLogin = (userName, password) => ajax(BASE + '/loginAdmin',{userName,password},'POST')

//添加用户
export const reqAddUser = (user) => ajax(BASE + '/addUser',user,'POST')