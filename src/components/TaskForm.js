import React, { Component } from "react";
import { connect } from "react-redux";
import {todosRef} from '../config/firebase';
import * as actions from './../actions/index';

class TaskForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			'id': '',
			'name': '',
			'status': false
		}
	}

	componentWillMount(){
		var { selectedTask } = this.props;
		if(selectedTask){
			this.setState({
				id: selectedTask.id,
				name: selectedTask.name,
				status: selectedTask.status
			})
		}else{
			this.onClearForm();
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps && nextProps.selectedTask){
			this.setState({
				id: nextProps.selectedTask.id,
				name: nextProps.selectedTask.name,
				status: nextProps.selectedTask.status
			})
		} else if(!nextProps.selectedTask){
			this.onClearForm();
		}
	}

	onCloseForm=()=>{
		this.props.onCloseForm();
	}
	
	onChange=(e)=>{
		var target = e.target;
		var name = target.name;
		var value = target.value;
		if( name === 'status'){
			value = target.value === 'true' ?  true : false;
		}

		this.setState({
			[name]: value
		});
	}
	onSave=(e)=>{
		e.preventDefault();
		console.log("aa: ",this.state);
		todosRef.push().set(this.state);
		this.props.onSaveTask(this.state);

		//Clear and Close
		this.onClearForm();
		this.onCloseForm();
	}

	onClearForm=()=>{
		this.setState({
			name: '',
			status: false
		})
	}

	render() {
		var { id } = this.state;
		if(!this.props.isDisplayForm) return null;
		return (
			<form onSubmit={ this.onSave }>
				<fieldset className="uk-fieldset">
					<div uk-grid="true">
						<div className="uk-width-5-6">
							<legend className="uk-legend">{ id === "" ? 'Add Work' : 'Edit Work'}</legend>
						</div>
						<div className="uk-width-1-6 uk-text-justify uk-text-center">
							<button type="button" uk-close="true" onClick={this.onCloseForm}></button>
						</div>
					</div>
					<div className="uk-margin">
						<label className="uk-form-label">Name</label>
						<div className="uk-form-controls">
							<input className="uk-input" 
									type="text" placeholder="Some text..."
									name="name" value={this.state.name}
									onChange={this.onChange}
							/>
						</div>
					</div>
					<div className="uk-margin">
						<label className="uk-form-label">Status</label>
						<div className="uk-form-controls">
							<select className="uk-select"
									name="status" value={this.state.status} onChange={this.onChange}>
								<option value={true}>Active</option>
								<option value={false}>Hide</option>
							</select>
						</div>
					</div>
					<div className="uk-margin">
						<div className="uk-form-controls">
							<button type="submit" className="uk-button">Submit</button>&nbsp;
							<button type="button" className="uk-button" onClick={ this.onClearForm }>Cancel</button>
						</div>
					</div>
				</fieldset>
			</form>
		)
	}
}

const mapStateToProps=(state)=>{
	return {
		isDisplayForm : state.toggleForm,
		selectedTask : state.selectedTask
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		onSaveTask : (task)=>{
			dispatch(actions.saveTask(task));
		},
		onCloseForm : () =>{
			dispatch(actions.closeForm());
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);