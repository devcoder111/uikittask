import * as types from  './../constants/ActionType';

var initialState = {
    filterName: '',
    filterStatus: -1
};


var myReducer =(state = initialState, action) => {
    switch (action.type) {
        case types.FILTER_TASK:
            action.filterTask ={
                ...action.filterTask,
                filterStatus: parseInt(action.filterTask.filterStatus, 10)
            }
            return action.filterTask;
        default: 
            return state;
    }
}

export default myReducer;