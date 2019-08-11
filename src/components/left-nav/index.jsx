import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';
import logo from '../../assets/images/logos.jpg'
import menuList from '../../config/menuConfig'
import './index.less'

const { SubMenu } = Menu;

//左侧导航栏的组件
class leftNav extends Component {
    /**
     * 根据menu的数据数组生成对应的标签数组
     * map + 递归调用
     */
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if(!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else{
                return (
                    <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                        }
                    >
                    {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    render() {
        //得到当前请求的路由路径
        const path = this.props.location.pathname
        return (
            <div to='/' className='left-nav'>
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt="logo"/>
                    <h1>硅谷后台</h1>
                </Link>

                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys = {[path]}
                    defaultOpenKeys = {[]}
                    >
                    {
                        this.getMenuNodes(menuList)
                    }
                    
                </Menu>
            </div>
        )
    }
}

export default withRouter(leftNav)
