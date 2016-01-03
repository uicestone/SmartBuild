import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';
import _ from 'lodash'

import Request from './mod/request'

class SideBar extends React.Component {
    constructor () {
        super()
    }
    render() {
        return (
            <div className="side-bar">
                <h3>{this.props.data.name}</h3>
                <ul>
                    {/*this.props.data.descriptions.map((des) => <li>{des}</li> )*/} 

                </ul>
                <span className="price">{this.props.data.price}元</span>
            </div>
        )
    }
}

class Item extends React.Component {
    constructor () {
        super()
    }
    render() {
        return (
            <div className="row-fluid ">
                <h3>
                    项目背景 
                    <button className="btn btn-mini btn-success">编辑</button>
                </h3>
                <div className="">楼宇自控系统(BAS)是近年开发并逐步推行的一项高科技楼宇管理系统,包括先进的硬件系统设备及优化的软件管理思维,建筑设备自动化系统 ( 简称 BAS) 是现代计算机技术 , 现代通信技术和现代控制技术的结合 , 是智能建筑的主要系统 , 也是智能建筑的重要标志 . 建筑物自动化系统 (BAS) 的含义是将建 筑物 ( 或建筑群 ) 内的电力、照明、空调、给排水、防灾、保安、广播、通讯等设备以集中监视与管理为目的 , 构成的一个综合系统。一般的是集散型系统 , 即分散 控制与集中监视、管理的计算机局域网。目的是使建筑物成为具有最佳工作与生活环境、设备高效运行、整体节能效果最佳、安全的场所。</div>
            </div>
        )
    }
}

class DocGeneration extends React.Component {
    constructor () {
        super()
        this.state = {
            item: {},
            isSideBarOpen: true
        }
    }
    componentDidMount () {
        // ajax get data
        setTimeout(()=> {
            let data = Request.getCasesData()
            console.log(data)
            this.setState({
                cases: data.cases
            })
        }, 300)
    }
    render() {
        if (!this.state.cases) return null

        return (
            <div className="page-dco-generation"> 
                <header className="row-fluid">
                    <div className="span3"><h1>文书生成</h1></div>
                    <div className="span2 offset7">
                        <Link className="btn btn-mini btn-success" to="/login">打印</Link>
                        <Link className="btn btn-mini btn-success" to="/reg">保存文书</Link>
                    </div>
                </header>
                <div className="container row-fluid">
                    <div className="{ this.state.isSideBarOpen ? 'span8' : ''}">
                        <div>
                            <h2>
                                XXX楼宇设计方案项目评估书 
                                <button className="btn btn-mini btn-success">编辑</button>
                            </h2>
                        </div> 
                        {[1,2,3,4,5].map((des) => <Item/> )}
                    </div>
                    
                    <SideBar className="{ this.state.isSideBarOpen ? 'span3' : 'hide'}" data={this.state.item}/>
                </div>
            </div> 
        )
    }
}

export default DocGeneration

