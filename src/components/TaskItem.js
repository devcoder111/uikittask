import React, { Component } from "react";

import * as actions from './../actions/index';
import { connect } from 'react-redux';

class TaskItem extends Component {

    updateStatus=()=>{
        this.props.onUpdateStatus(this.props.task.id);
    }
    deleteTask=()=>{
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();
    }

    updateTask=()=>{
        this.props.onSelectedTask(this.props.task);
        this.props.onOpenForm();
    }

    render() {
        var { task, index } = this.props;
        return (
            <tr>
                <td>{ index + 1 }</td>
                <td>{task.name}</td>
                <td className="uk-text-center">
                    <span 
                        className={ task.status === true ? 'uk-label uk-label-success label-cursor' : 'uk-label uk-label-danger label-cursor'}
                        onClick={this.updateStatus}
                    > 
                        {task.status === true ? 'Active' : 'Hide'}
                    </span>
                </td>
                <td className="uk-text-center">
                    <button type="button" className="uk-button uk-button-default" onClick={this.updateTask}>Edit</button>&nbsp;
                    <button type="button" className="uk-button uk-button-danger" onClick={this.deleteTask}>Delete</button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // tasks : state.tasks
    }
} 

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) =>{
            dispatch(actions.updateStatusTask(id))
        },
        onDeleteTask : (id) => {
            dispatch(actions.deleteTask(id))
        },
        onCloseForm : () =>{
            dispatch(actions.closeForm());
        },
        onSelectedTask: (task) => {
            dispatch(actions.selectedTask(task));
        },
        onOpenForm : () =>{
            dispatch(actions.openForm());
        }
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);