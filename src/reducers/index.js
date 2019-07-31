import { combineReducers } from 'redux';
import tasks from './tasks';
import toggleForm from './toggleForm';
import selectedTask from './selectedTask';
import filterTask from './filterTask';
import searchTask from './searchTask';
import sortTask from './sortTask';

const myReducer = combineReducers({
    tasks,
    toggleForm,
    selectedTask,
    filterTask,
    searchTask,
    sortTask
});

export default myReducer;