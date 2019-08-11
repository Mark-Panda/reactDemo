import React, { Component } from 'react'
import './index.less'

/**
 * 
 * @param {外形像链接的按钮} props 
 */
export default function LinkButton(props) {
    return <button {...props} className="link-button"></button>
}