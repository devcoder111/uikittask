import * as types from  './../constants/ActionType';

var initialState = {
    sortBy: 'name',
    sortValue: 1
};


var myReducer =(state = initialState, action) => {
    switch (action.type) {
        case types.SORT_TASK:
            action.sortTask = {
                ...action.sortTask,
                sortValue : parseInt(action.sortTask.sortValue, 10)
            }
            return action.sortTask;
        default: 
            return state;
    }
}

export default myReducer;