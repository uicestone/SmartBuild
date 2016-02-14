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
        this.setState({item: nextProps.item})
    }
    shouldComponentUpdate (nextProps, nextState) {
        return !!(nextProps.item && nextProps.item.name !== undefined)
    }
    changeTextArae (e) {
        const text = typeof e == 'object' ? e.target.value : e
        let item
        if (this.state.item.editType == 'title') {
            this.state.item.name = text
            item = ReactUpdate(this.state.item, {name: {$set: text}})
        } else {
            this.state.item.content = text
            item = ReactUpdate(this.state.item, {content: {$set: text}})
        }
        this.setState({item: item})
    }
    changeFillIn (question, i, e) {
        const text = typeof e == 'object' ? e.target.value : e
        let questionObj = {}
        questionObj[i] = {value:  {$set: text}}
        let item = ReactUpdate(this.state.item, {questions: questionObj})
        this.setState({
            item: item
        })
    }
    replaceWithInput (question, i) {
        let text = question.text.split('<>')
        return (<div>
            {text[0]} 
            <input type="text" 
                value={question.value} 
                onChange={this.changeFillIn.bind(this, question, i)}
                id={"inputWarning" + i} />  
            {text[1]}
        </div>)
    }
    handleSave () {
        let saveFn
        switch (this.state.item.editType) {
            case 'title':
                this.props.save(this.state.item)
                break;
            case 'text':
                this.props.save(this.state.item)
                break;
            case 'advance':
                this.props.save(this.state.item)
                break;
        }
    }
    choose (i, question, j) {
        let questionObj = {}
        questionObj[i] = {value:  {$set: j}}
        let item = ReactUpdate(this.state.item, {questions: questionObj})
        this.setState({
            item: item
        })
    }
    render() {
        let tpl
        switch (this.props.item.editType) {
            case 'title':
                tpl = <div>
                    <h4>标题</h4>
                    <div>
                        <textarea rows="8" 
                            value={this.state.item.name} 
                            onChange={this.changeTextArae.bind(this)}
                            ref='newTxt' />
                    </div>
                    <span>示例一</span>
                    <span>示例二</span>
                </div>
                break;
            case 'text':
                tpl = <div>
                    <h4>{this.props.item.name}</h4>
                    <div>
                        <textarea rows="8" 
                            value={this.state.item.content} 
                            onChange={this.changeTextArae.bind(this)}
                            ref='newTxt' />
                    </div>
                    <span>示例一</span>
                    <span>示例二</span>
                    <span>示例三</span>
                </div>
                break;
            case 'advance':
                tpl = <div>
                    <h4>{this.props.item.name}</h4>
                    {this.state.item.questions.map(function (question, i) {
                        let questionDom;
                        if (question.type == "fillIn") {
                            questionDom = (
                                <div className="control-group" key={i}>
                                    <div className="controls">
                                        {this.replaceWithInput(question, i)}
                                    </div>
                                </div>
                            )
                        } else if (question.type == "radio") {
                            questionDom = (
                                <div className="control-group" key={i}>
                                    <label className="control-label">{question.text}:</label>
                                    <div className="controls">
                                    {question.options.map(function (option, j) {
                                        return (
                                            <label key={j}>
                                                <input type="radio" 
                                                    checked={question.value == j}
                                                    onChange={this.choose.bind(this, i, question, j)}
                                                    name={`optionsRadios${i}`} 
                                                    value="option1" />
                                                <a className="btn">{option}</a>
                                            </label>
                                        )
                                    }.bind(this))}
                                    </div>
                                </div>
                            )
                        }
                        return questionDom;

                    }.bind(this))}
                </div>
                break;
        }
        return (
            <div className={classnames({'side-bar span3': true,'hide': !this.props.isSideBarOpen})}>
                <div className="inner">
                    {tpl}
                    <div className="bottom">
                        <button onClick={this.handleSave.bind(this)} className="btn btn-success btn-small">保存</button>
                    </div>
                </div>
            </div>
        )
    }
}
SideBar.propTypes = {
    item: PropTypes.object.isRequired,
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
            question: {
                type: '',
                data: {}
            }
        }
    }
    componentDidMount () {
        // ajax get data
        setTimeout(()=> {
            let data = Request.getDocGenerationData(this.props.params.docId)
            console.log(data)
            this.setState({
                data: data
            })
        }, 300)
    }
    edit (key, item) {
        this.setState({
            isSideBarOpen: true,
            editKey: key,
            question: item
        })
    }
    save (item) {
        let newData
        let setObj = {}
        switch (this.state.question.editType) {
            case 'title':
                newData = ReactUpdate(this.state.data, {title: {$set: item}})
                break;
            case 'text':
                setObj[this.state.editKey] = {$set: item}
                newData = ReactUpdate(this.state.data, setObj)
                break;
            case 'advance':
                setObj.overall = {$set: item}
                newData = ReactUpdate(this.state.data, setObj)
                break;

        }
        // if (this.state.question.editType == 'title') {
        //     newData = ReactUpdate(this.state.data, { name: {$set: text} })
        // } else {
        //     let itemData = {}
        //     let items = ReactUpdate(this.state.data.items, itemData)
        //     newData = ReactUpdate(this.state.data, {$merge: {items: items}})
        // }
        this.setState({
            data: newData,
            isSideBarOpen: false
        })
    }
    render() {
        if (!this.state.data) return null

        const { generation, incrementIfOdd, incrementAsync, decrement, counter } = this.props.route
        let DocData = this.state.data
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
                                {DocData.title.name}
                                <button className="btn btn-mini btn-success" 
                                        onClick={this.edit.bind(this, 'title', DocData.title)}
                                >编辑</button>
                            </h2>
                        </div> 
                        <div className="item">
                            <h3>
                                {DocData.background.name} 
                                <button className="btn btn-mini btn-success"
                                        onClick={this.edit.bind(this, 'background', DocData.background)}
                                >编辑</button>
                            </h3>
                            <div className="" dangerouslySetInnerHTML={{__html: DocData.background.content}}></div>
                        </div>
                        <div className="item">
                            <h3>
                                {DocData.standard.name} 
                                <button className="btn btn-mini btn-success"
                                        onClick={this.edit.bind(this, 'standard', DocData.standard)}
                                >编辑</button>
                            </h3>
                            <div className="" dangerouslySetInnerHTML={{__html: DocData.standard.content}}></div>
                        </div>
                        <div className="item">
                            <h3>
                                {DocData.system.name} 
                                <button className="btn btn-mini btn-success"
                                        onClick={this.edit.bind(this, 'system', DocData.system)}
                                >编辑</button>
                            </h3>
                            <div className="" dangerouslySetInnerHTML={{__html: DocData.system.content}}></div>
                        </div>
                        <div className="item">
                            <h3>
                                {DocData.overall.name} 
                                <button className="btn btn-mini btn-success"
                                        onClick={this.edit.bind(this, 'overall', DocData.overall)}
                                >编辑</button>
                            </h3>
                            { DocData.overall.questions.map(function (item, i) {

                                let itemDom;
                                if (item.type == "fillIn") {
                                    itemDom = (
                                        <div className="control-group" key={i}>
                                            <label className="control-label" htmlFor={`inputWarning${i}`}>{item.text.replace('<>', item.value)}</label>
                                        </div>
                                    )
                                } else if (item.type == "radio") {
                                    itemDom = (
                                        <div className="control-group" key={i}>
                                            <label className="control-label">{item.text}:{item.options[item.value]}</label>
                                        </div>
                                    )
                                }
                                return itemDom;

                            }.bind(this))}
                        </div>
                    </div>
                    <SideBar isSideBarOpen={this.state.isSideBarOpen} save={this.save.bind(this)} item={this.state.question} />
                </div>
            </div> 
        )
    }
}

export default DocGeneration

