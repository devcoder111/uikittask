import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskSort extends Component {

    componentWillReceiveProps(nextProps){
        this.setState({
            sortBy : nextProps.sortTask.sortBy,
            sortValue : nextProps.sortTask.sortValue
        })
    }
    sortTask=(by, value)=>()=>{
        var sortTask = {
            sortBy : by,
            sortValue : value
        };
        this.props.onSortTask(sortTask);
    }
    render() {
        var {sortBy, sortValue} = this.props.sortTask;
        return (
            <div className="uk-width-1-2">
                    <div className="uk-inline">
                        <button className="uk-button uk-button-default" type="button">Sort</button>
                        <div uk-dropdown="mode: click">
                            <ul className="uk-nav uk-dropdown-nav">
                                <li className="uk-nav-header">Sort Task</li>
                                <li  className={(sortBy === 'name' && sortValue === 1 ) ? 'uk-active' : ''} onClick={ this.sortTask('name', 1) }>
                                    <a>Name A-Z</a>
                                </li>
                                <li className={(sortBy === 'name' && sortValue=== -1 ) ? 'uk-active' : ''} onClick={ this.sortTask('name', -1) }>
                                    <a>Name Z-A</a>
                                </li>
                                <li className="uk-nav-divider"></li>
                                <li className={(sortBy === 'status' && sortValue === 1 ) ? 'uk-active' : ''} onClick={ this.sortTask('status', 1) }>
                                    <a>Active Status</a>
                                </li>
                                <li className={(sortBy === 'status' && sortValue === -1 ) ? 'uk-active' : ''} onClick={ this.sortTask('status', -1) }>
                                    <a>Hide Status</a>
                                </li>
                            </ul>
                        </div>
                    </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        sortTask : state.sortTask,
    }
}
const mapDispatchToProps = (dispatch, props) =>{
    return{
        onSortTask: (sortTask) =>{
            dispatch(actions.sortTask(sortTask));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskSort);