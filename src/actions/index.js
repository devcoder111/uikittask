import * as types from  './../constants/ActionType';

export const listALL = () => {
    return {
        type: types.LIST_ALL
    }
} 
export const saveTask = (task) => {

    return {
        type: types.SAVE_TASK,
        task
    }
} 
export const deleteTask = (id) => {
    return {
        type: types.DELETE_TASK,
        id
    }
} 
export const selectedTask = (task) => {
    return {
        type: types.SELECTED_TASK,
        task
    }
} 
export const openForm = () => {
    return {
        type: types.OPEN_FORM,
    }
} 
export const closeForm = () => {
    return {
        type: types.CLOSE_FORM,
    }
} 
export const updateStatusTask = (id) => {
    return {
        type: types.UPDATE_STATUS_TASK,
        id
    }
} 
export const filterTask = (filterTask) => {
    return {
        type: types.FILTER_TASK,
        filterTask
    }
} 
export const searchTask = (searchTask) => {
    return {
        type: types.SEARCH_TASK,
        searchTask
    }
} 
export const sortTask = (sortTask) => {
    return {
        type: types.SORT_TASK,
        sortTask
    }
} 
export const getItem = (getItem) => {
    return {
        type: types.GET_ITEM,
        getItem
    }
} 