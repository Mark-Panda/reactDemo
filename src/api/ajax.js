/**
 * 能发送异步ajax请求的函数模块
 * 1.优化：统一处理请求异常
 */


import axios from 'axios';
import {message} from 'antd';

export default function ajax(url, data={}, type='GET'){

    return new Promise((resolve, reject) => {
        let promise;
        //1.执行异步ajax请求
        if (type === 'GET') {  //qingq
            promise =  axios.get(url,{
                params: data  //指定请求参数
            })
        }else{  //post请求
            promise =  axios.post(url, data)
        }
        //2、如果成功，调用resolve(value)
        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            message.error('请求出错了' + error.message)
        })
        //3、如果失败了，不调用reject(value),而是提示异常信息

    })

    
}