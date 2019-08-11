/**
 * 包含应用中所有的接口请求函数模块
 * 每个函数返回的都是promise
 */
import jsonp from 'jsonp';
import ajax from './ajax';
import { message } from 'antd';
const BASE = 'http://39.105.222.70:7001'

 //登录
//  export function reqLogin(username, password) {
//     return ajax('/loginAdmin',{username,password},'POST')
//  }

export const reqLogin = (userName, password) => ajax(BASE + '/loginAdmin',{userName,password},'POST')

//添加用户
export const reqAddUser = (user) => ajax(BASE + '/addUser',user,'POST')

/**
 * jsonp请求的接口函数
 */
export const reqWeather = (city) => {

    return new Promise((resolve,reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        //发送jsonp请求
        jsonp(url,{}, (err,data) => {
            console.log('jsonp()',err,data);
            //如果成功
            if(!err && data.status === 'success'){
                const {dayPictureUrl, weather} = data.results[0].weather_data[0]
                resolve({dayPictureUrl, weather})
            }else{
                //失败了
                message.error('获取天气信息失败！')
            }
        })
    })
    
}

