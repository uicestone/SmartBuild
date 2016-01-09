import React from 'react/addons';
import { Router, Route, Link, Redirect } from 'react-router';
import _ from 'lodash'

import Request from '../mod/request'

class SideBar extends React.Component {
    constructor (props) {
        super(props)
        this.state = {name: this.props.data.name}
    }
    shouldComponentUpdate (nextProps, nextState) {
        console.log(nextProps, nextState)
        return nextProps.data && nextProps.data.name
    }
    changeName (e) {
        const text = typeof e == 'object' ? e.target.value : e
        this.setState({name: text})
    }
    save (text) {
        return ()=> this.props.save(text)()
    }
    render() {
        // if (!this.props.data.name) return null

        return (
            <div className={'side-bar ' + (this.props.isSideBarOpen ? 'span3' : 'hide')}>
                <div className="inner">
                    <h4>标题</h4>
                    <div>
                        <textarea rows="8" value={this.state.name} onChange={this.changeName.bind(this)}/>
                    </div>
                    <span>示例一</span>
                    <span>示例二</span>
                    <span>示例三</span>
                    <div className="bottom">
                        <button onClick={this.save(this.state.name)} className="btn btn-success btn-small">保存</button>
                    </div>
                </div>
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
            <div className="item">
                <h3>
                    {this.props.data.name} 
                    <button className="btn btn-mini btn-success"
                            onClick={this.props.edit}
                    >编辑</button>
                </h3>
                <div className="" dangerouslySetInnerHTML={{__html: this.props.data.description}}></div>
            </div>
        )
    }
}

class DocGeneration extends React.Component {
    constructor () {
        super()
        this.state = {
            isSideBarOpen: false,
            editedItem: {}
        }
    }
    componentDidMount () {
        // ajax get data
        setTimeout(()=> {
            let data = Request.getDocGenerationData()
            console.log(data)
            this.setState({
                data: data
            })
        }, 300)
    }
    openSideBar (item) {
        this.setState({
            isSideBarOpen: true,
            editedItem: item
        })
        this.forceUpdate()

    }
    save (text) {
        return ()=> {
            let newData = React.addons.update(this.state.data, { name: {$set: text} })
            this.setState({
                isSideBarOpen: false,
                data: newData
            })



        }.bind(this)
    }
    render() {
        if (!this.state.data) return null

        return (
            <div className="page-dco-generation"> 
                <header className="row-fluid">
                    <div className="span3"><h1>文书生成</h1></div>
                    <div className={'span2 ' + (this.state.isSideBarOpen ? 'offset4' : 'offset7')}>
                        <Link className="btn btn-mini btn-success" to="/login">打印</Link>
                        <Link className="btn btn-mini btn-success" to="/reg">保存文书</Link>
                    </div>
                </header>
                <div className="container row-fluid">
                    <div className={this.state.isSideBarOpen ? 'span9' : ''}>
                        <div className="item">
                            <h2>
                                {this.state.data.name} 
                                <button className="btn btn-mini btn-success" 
                                        onClick={this.openSideBar.bind(this, {name: this.state.data.name})}
                                >编辑</button>
                            </h2>
                        </div> 
                        {this.state.data.items.map((item) => <Item edit={this.openSideBar.bind(this, item)} data={item} /> )}
                    </div>
                    <SideBar isSideBarOpen={this.state.isSideBarOpen} save={this.save.bind(this)} data={this.state.editedItem}/>
                </div>
            </div> 
        )
    }
}

export default DocGeneration

