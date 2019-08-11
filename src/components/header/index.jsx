import React, { Component } from 'react'
import moment from 'moment'
import {reqWeather} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import './index.less'
//头部导航栏的组件
export default class header extends Component {

    state = {
        currentTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        dayPictureUrl: '',   //天气图片
        weather: ''
    }

    getTime = () => {
        setInterval(() => {
            const currentTime = moment().format('YYYY-MM-DD HH:mm:ss')
            this.setState({currentTime})
        },1000)
    }

    getWeather = async () => {
        const {dayPictureUrl, weather} = await reqWeather('北京')
        this.setState({dayPictureUrl, weather})
    }
    /**
     * 第一次render之后执行一次
     * 一般在此执行异步操作：发ajax请求/启动定时器
     */
    componentDidMount (){
        //获取当前时间
        this.getTime()
        //获取当前天气
        this.getWeather()
    }

    render() {

        const {currentTime,dayPictureUrl,weather} = this.state;
        const username = memoryUtils.user.userName;

        return (
            <div className='header'>
                <div className="header-top">
                    <span>欢迎，{username}</span>
                    <a href="javascript:">退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">首页</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather"/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
