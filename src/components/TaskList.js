import React, { Component } from "react";
import TaskItem from "./TaskItem";
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import Firebase from "firebase";

class TaskList extends Component {
    constructor(props){
        super(props);
        this.setState ={
            filterName : '',
            filterStatus: -1
        }
    }

    componentDidMount(){
    	this.getItemData();
    }

    onChange = (e) =>{
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        // this.setState({
        //     [name]: value
        // });
        this.props.onFilterTask({
            filterName: name === 'filterName' ? value : '',
            filterStatus: name === 'filterStatus' ? value : -1,
        });
    }

    onClearFilter=()=>{
        var filterTask = {
            filterName: '',
            filterStatus: -1
        };
        this.props.onFilterTask(filterTask);
    }

    getItemData=()=>{
    	
    	// this.props.onGetItem();
        let ref = Firebase.database().ref("todos");
        ref.on("value", snapshot => {
	     const result = snapshot.val();
	     this.props.onGetItem(result);
	      // this.setState(state);
	    });

      
    }

    
    render() {
        var { tasks, filterTask, keyword, sortTask }= this.props; // <=> var tasks = this.props.tasks;
        var {filterName, filterStatus} = filterTask;
        var {sortBy, sortValue} = sortTask;

        //Filter
        if(filterName){
            tasks = tasks.filter((task)=>{
                return task.name.toLowerCase().indexOf(filterName) !== -1;
            });
            tasks = tasks.filter((task)=>{
                if (filterStatus=== -1) {
                    return task;
                } else {
                    return task.status === (filterStatus === 1 ? true : false);
                }
            });
        }

        tasks = tasks.filter((task)=>{
            if (filterStatus=== -1) {
                return task;
            } else {
                return task.status === (filterStatus === 1 ? true : false);
            }
        });
   
        //Search
        tasks = tasks.filter((task)=>{
            return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });

        //Sort
        
		if(sortBy === 'name'){
			tasks = tasks.sort((a, b)=>{
				if(a.name > b.name) return sortValue;
				else if (a.name < b.name) return -sortValue;
				else return 0;
			})
		}else {
			tasks = tasks.sort((a, b)=>{
				if(a.status > b.status) return -sortValue;
				else if (a.status < b.status) return sortValue;
				else return 0;
			})
		}	
   

        var elmTasks = tasks.map((task, index)=>{
            return <TaskItem 
                        key={index} 
                        index={index} 
                        task={task}
                    />
        });
        return (
            <table className="uk-table uk-table-striped uk-table-divider">
                <thead>
                    <tr>
                        <th className="uk-text-bold uk-text-center">No.</th>
                        <th className="uk-text-bold uk-text-center">Name</th>
                        <th className="uk-text-bold uk-text-center">Status</th>
                        <th className="uk-text-bold uk-text-center">Active</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td className="uk-text-center">
                            <input className="uk-input" placeholder="Filter text..."
                                type="text" name="filterName"
                                value={ filterName } onChange={this.onChange}
                            />
                        </td>
                        <td className="uk-text-center">
                            <select className="uk-select" name="filterStatus" value={filterStatus} onChange={this.onChange}>
                                <option value={-1}>All</option>
                                <option value={0}>Hide</option>
                                <option value={1}>Active</option>
                            </select>
                        </td>
                        <td className="uk-text-center">
                            <button className="uk-button uk-button-default" onClick={ this.onClearFilter }> Clear Filter</button>
                        </td>
                    </tr>
                    { elmTasks }
                </tbody>
            </table>
        );
    }
}


const mapStateToProps = (state) => {
	console.log("task", state.tasks);
    return {
        tasks : state.tasks,
        filterTask : state.filterTask,
        keyword: state.searchTask,
        sortTask: state.sortTask
    }
}
const mapDispatchToProps = (dispatch, props) =>{
    return{
        onFilterTask: (filterTask) =>{
            dispatch(actions.filterTask(filterTask));

        },
         onGetItem: (result) =>{
            dispatch(actions.getItem(result));

        },
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);