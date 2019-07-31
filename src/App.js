import React, {Component} from 'react';
import './App.css';
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Control from "./components/TaskControl";

import { connect } from 'react-redux';
import * as actions from './actions/index';


class App extends Component {

	onShowForm=()=>{
		this.props.onOpenForm();
		this.props.onSelectedTask({
			id: '',
			name: '',
			status: false
		});
	}
	render() {
		var { isDisplayForm } = this.props;
		return (
			<div className="uk-container">
				<div>
					<h1 className="uk-text-bold uk-text-center">Manage Work</h1>
					<hr />
				</div>
				<div uk-grid="true">
					<div className={isDisplayForm ? 'uk-width-1-4' : ''}>
						<TaskForm />
					</div>
					<div className={ isDisplayForm ? 'uk-width-3-4' : 'uk-width-1-1'}>
						<div uk-grid="true">
							<div className="uk-width-1-3">
								<button type="button" className="uk-button" onClick={this.onShowForm}>Add</button>
							</div>
							<div className="uk-width-2-3">
								<Control />
							</div>
						</div>
						<TaskList />
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		isDisplayForm : state.toggleForm
	}
}

const mapDispatchToProps = (dispatch, props) =>{
	return {
		onOpenForm : () =>{
            dispatch(actions.openForm());
		},
		onSelectedTask: (task) => {
            dispatch(actions.selectedTask(task));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);