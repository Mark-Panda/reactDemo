import React, { Component } from 'react'
import { Form, Icon, Input, Button , message} from 'antd';
import {Redirect} from 'react-router-dom'
import './login.less';
import logo from '../../assets/images/logos.jpg'
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils'

const Item = Form.Item  //不能写在import之前
/**
 * 登录的路由组件
 */
class Login extends Component {

    handleSubmit = (event) => {

        //阻止事件的默认行为
        event.preventDefault()
        //对所有的表单字段进行检验
        this.props.form.validateFields(async (err, values) => {
            //检验成功
            if (!err) {
                console.log('提交登录的ajax请求',values);
                //请求登录
                const {username, password} = values;
                const result = await reqLogin(username, password)
                console.log('请求成功',result);
                // const result = response.data
                if(result.status === 200){
                    message.success('登录成功')
                    const user = result.data
                    memoryUtils.user = user   //保存在内存中
                    storageUtils.saveUser(user)   //保存到local中
                    //跳转   不需要回退
                    this.props.history.replace('/')
                }else{
                    //登录失败提示错误信息
                    message.error(result.msg)
                }
            }else{
                console.log('校验失败')
            }
        });
        // //得到form对象
        // const from = this.props.form
        // //获取表单项的输入数据
        // const values = from.getFieldsValue()
        // console.log('----',values);
    }
    /**
     * 对密码进行自定义
     */
    validatePass = (rule, value, callback) => {
        console.log('validatePass()',rule,value)
        if(!value){
            callback('密码不能为空')
        }else if(value.length < 4){
            callback('密码长度不能小于4')
        }else if(value.length > 12){
            callback('密码不能大于12位')
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须是英文，数字或下划线')
        }else{
            callback()   //验证成功
        }
        
    }

    render() {

        //如果用户已经登录，自动跳转管理界面
        const user = memoryUtils.user
        if(user && user.userId){
            return <Redirect to='/'/>
        }
        //得到具有强大功能的表单数据
        const {getFieldDecorator} = this.props.form    
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt='logo' />
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true, whitespace: true,message: '输入不能为空' },
                                    { min: 4, message: '最少输入4位' },
                                    { max: 12, message: '最多输入12位' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文，数字或下划线' },
                                ],
                            })(
                                <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                                />,
                            )}
                        </Item>
                        <Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    { validator: this.validatePass}
                                ],
                            })(
                                <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                                />,
                            )}        
                        </Item>
                        <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                             登录
                        </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}

/**
 * 高阶函数
 * 高阶组件
 */
const WrapLogin = Form.create()(Login);

export default WrapLogin
/**
 * 前台表单验证
 * 手机表单输入数据
 */