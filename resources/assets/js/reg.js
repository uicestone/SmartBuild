import React from 'react';

import { Router, Route, Link, Redirect } from 'react-router';

class Reg extends React.Component {
    constructor () {
        super()
    }
    render() {
        const items = this.props.items
        return (
            <form className="form-horizontal box">
                <h5>登录</h5>
                <div className="control-group">
                    <label className="control-label" htmlFor="inputEmail">用户名：</label>
                    <div className="controls">
                        <input type="text" id="inputEmail" placeholder="用户名" />
                    </div>
                </div>
                <div className="control-group">
                    <label className="control-label" htmlFor="inputPassword">密码：</label>
                    <div className="controls">
                        <input type="password" id="inputPassword" placeholder="密码" />
                        <a href="">忘记密码</a>
                    </div>
                </div>
                <div className="control-group">
                    <label className="control-label" htmlFor="inputPassword">验证码：</label>
                    <div className="controls">
                        <input type="password" id="inputPassword" placeholder="密码" />
                        <img></img>
                    </div>
                </div>
                <div className="control-group">
                    <div className="controls">
                        <label className="checkbox">
                            <input type="checkbox" /> Remember me
                        </label>
                        <button type="submit" className="btn">Sign in</button>
                    </div>
                </div>
            </form> 
        )
    }
}

export default {Reg}

