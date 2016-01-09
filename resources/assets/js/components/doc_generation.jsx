import React, { PropTypes, Component } from 'react'
import ReactUpdate from 'react-addons-update'
import { Router, Route, Link, Redirect } from 'react-router'
import _ from 'lodash'
import classnames from 'classnames'


import Request from '../mod/request'

class SideBar extends Component {
    constructor (props, context) {
        super(props, context)
        this.state = {}
    }
    componentWillReceiveProps (nextProps) {
        this.setState({name: nextProps.data.name})
    }
    shouldComponentUpdate (nextProps, nextState) {
        return !!(nextProps.data && nextProps.data.name !== undefined)
    }
    changeName (e) {
        const text = typeof e == 'object' ? e.target.value : e
        this.setState({name: text})
    }
    render() {
        return (
            <div className={classnames({'side-bar span3': true,'hide': !this.props.isSideBarOpen})}>
                <div className="inner">
                    <h4>标题</h4>
                    <div>
                        <textarea rows="8" value={this.state.name} onChange={this.changeName.bind(this)}/>
                    </div>
                    <span>示例一</span>
                    <span>示例二</span>
                    <span>示例三</span>
                    <div className="bottom">
                        <button onClick={_.partial(this.props.save, this.state.name)} className="btn btn-success btn-small">保存</button>
                    </div>
                </div>
            </div>
        )
    }
}
SideBar.propTypes = {
    data: PropTypes.object.isRequired,
    isSideBarOpen: PropTypes.bool,
    save: PropTypes.func.isRequired
}


class Item extends Component {
    constructor (props, context) {
        super(props, context)
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
Item.propTypes = {
    data: PropTypes.object.isRequired
}


class DocGeneration extends Component {
    constructor () {
        super()
        this.state = {
            isSideBarOpen: false,
            editedItem: {
                type: '',
                data: {}
            }
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
    edit (type, item, i) {
        this.setState({
            isSideBarOpen: true,
            editedItem: {
                type: type,
                data: item,
                idx: i
            }
        })
        // this.forceUpdate()

    }
    save (text) {
        let newData
        if (this.state.editedItem.type == 'title') {
            newData = ReactUpdate(this.state.data, { name: {$set: text} })
        } else {
            let itemData = {}
            itemData[this.state.editedItem.idx] = {name: {$set: text}}
            let items = ReactUpdate(this.state.data.items, itemData)
            newData = ReactUpdate(this.state.data, {$merge: {items: items}})
        }
        this.setState({
            data: newData,
            isSideBarOpen: false
        })
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
                                        onClick={this.edit.bind(this, 'title', {name: this.state.data.name})}
                                >编辑</button>
                            </h2>
                        </div> 
                        {this.state.data.items.map((item,i) => <Item key={i} edit={this.edit.bind(this, 'item', item, i)} data={item} /> )}
                    </div>
                    <SideBar isSideBarOpen={this.state.isSideBarOpen} save={this.save.bind(this)} data={this.state.editedItem.data} />
                </div>
            </div> 
        )
    }
}

export default DocGeneration

