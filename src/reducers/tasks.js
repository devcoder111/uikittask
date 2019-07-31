import * as types from  './../constants/ActionType';
import Firebase from "firebase";

var dataLocalStorage = JSON.parse(localStorage.getItem('tasks'));
var initialState = dataLocalStorage ? dataLocalStorage : [];

var s4=()=>{
	return Math.floor((1+Math.random()) *0x10000).toString(16).substring(1);
};
var generateID=()=>{
	return s4() + '-' + s4() + s4() +s4() + '-' + s4() + s4() +s4();
};

var myReducer = (state = initialState, action) => {
	var index = -1;
	switch (action.type) {
		case types.LIST_ALL:
			return state;  
		case types.SAVE_TASK:
			alert("sadf");
			if(!action.task.id){//add
				action.task.id = generateID();
				state.push(action.task);
			}else{//edit
				index = state.findIndex(task => task.id === action.task.id);
				state[index] = action.task;
			}
			// localStorage.setItem('tasks', JSON.stringify(state));
			return [...state];
		case types.DELETE_TASK:
			index = state.findIndex(task => task.id === action.id);
			if(index !== -1){
				state.splice(index, 1);
				// localStorage.setItem('tasks', JSON.stringify(state));
			}
			return [...state];
		case types.UPDATE_STATUS_TASK:
			index = state.findIndex(task => task.id === action.id);
			if(index !== -1){
				state[index] = {
					...state[index],
					status : !state[index].status
				};
				// localStorage.setItem('tasks', JSON.stringify(state));
			}
			return [...state];

		case types.GET_ITEM:
			console.log("aaaa", action);
			let ref = Firebase.database().ref("todos");
	        ref.on("value", snapshot => {
		    
			  let todos = snapshot.val();
			  let keys = Object.keys(todos)
			  for (let i = 0; i < keys.length; i++) {
	                let key = keys[i];
	                let todo = todos[key];
	                initialState[index] = key;
	                initialState.push(todo);
	                console.log(todo)
	            }
	            // console.log("storage", initialState);
		      state = initialState;
		       console.log("123", state);
		    });
		    console.log("dd", state);
			return [...state];
		    // console.log("staet", state);
		    // return [state];
		default: 
			return state;
	}
}

export default myReducer;