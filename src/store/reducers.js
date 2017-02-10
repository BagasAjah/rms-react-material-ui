import C from '../constants';
import { combineReducers } from 'redux';
import update from 'react-addons-update';
import { setDefaultEmployee, searchEmployee } from "../lib/employee/employeeHelper";

const allEmployee = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_NEW_EMPLOYEE:
            return [
                ...state,
                action.employeeData
            ];
        case C.UPDATE_CURRENT_EMPLOYEE:
            const index = state.findIndex(s => s.id === action.employeeData.id);
            const updatedState = update(state, {
                [index] : {$set: action.employeeData}
            });
            return updatedState;
        case C.DELETE_CURRENT_EMPLOYEE:
            return state.filter(employeeData => employeeData.id !== action.employeeData.id)
        default:
            return state;
    }
    return state;
}

const currentEmployee = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_NEW_EMPLOYEE:
            return action.employeeData;
        case C.SET_EMPLOYEE:
            return action.currentEmployee;
        case C.DELETE_CURRENT_EMPLOYEE:
            return setDefaultEmployee();
        case C.UPDATE_CURRENT_EMPLOYEE:
            return action.employeeData;
        default:
            return state;
    }
    return state;
}

const currentTabLocation = (state = {}, action) => {
    switch (action.type) {
        case C.CHANGE_PATH_VALUE:
            return action.value;
        default:
            return state;
    }
    return '';
}

const editedEmployee = (state = {}, action) => {
    switch (action.type) {
        case C.SET_EMPLOYEE:
            return action.currentEmployee;
        case C.CHANGE_EDIT_EMPLOYEE:
            return action.currentEmployee;
        case C.DELETE_CURRENT_EMPLOYEE:
            return setDefaultEmployee();
        default:
            return state;
    }
    return state;
}

const employees = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_NEW_EMPLOYEE:
            return [
                ...state,
                action.employeeData
            ];
        case C.FILTERING:
            var employees = searchEmployee(action.allEmployee, action.searchText);
            return employees;
        case C.DELETE_CURRENT_EMPLOYEE:
            return state.filter(employeeData => employeeData.id !== action.employeeData.id);
        case C.UPDATE_CURRENT_EMPLOYEE:
            const index = state.findIndex(s => s.id === action.employeeData.id);
            const updatedState = update(state, {
                [index] : {$set: action.employeeData}
            });
            return updatedState;
        default:
            return state;
    }
    return state;
}

const newEmployee = (state = {}, action) => {
    switch (action.type) {
        case C.CHANGE_NEW_EMPLOYEE:
            return action.employeeData;
        default:
            return setDefaultEmployee();
    }
    return setDefaultEmployee();
}

const openDialog = (state = {}, action) => {
    switch (action.type) {
        case C.CHANGE_OPEN_DIALOG_VALUE:
            var updatedOpenDialog = update(state, {
                [action.fieldName] : {$set: action.value}
            });
            return updatedOpenDialog;
        default:
            return state;
    }
    return state;
}

const openValidationMessage = (state = {}, action) => {
    switch (action.type) {
        case C.CHANGE_VALIDATION:
            var nextState = update(state, {
                [action.fieldName] : {$set: action.value}
            });
            return nextState;
        default:
            return state;
    }
    return state;
}

const searchingText = (state = {}, action) => {
    switch (action.type) {
        case C.FILTERING:
            return action.searchText;
        default:
            return state;
    }
    return state;
}

const selectedIndex = (state = null, action) => {
    switch (action.type) {
        case C.SET_EMPLOYEE:
            return null;
        case C.CHANGE_SELECTED_INDEX:
            return action.value;
        default:
            return state;
    }
    return state;
}

const selectedJobDescIndex = (state = null, action) => {
    switch (action.type) {
        case C.CHANGE_SELECTED_JOBDESC_INDEX:
            return action.value;
        default:
            return state;
    }
    return state;
}

const viewMode = (state = true, action) => {
    switch (action.type) {
        case C.SET_EMPLOYEE:
            return true;
        case C.CHANGE_VIEW_MODE_VALUE:
            return action.value;
        default:
            return state;
    }
    return state;
}

export default combineReducers({
    allEmployee,
    currentEmployee,
    currentTabLocation,
    employees,
    editedEmployee,
    newEmployee,
    openDialog,
    openValidationMessage,
    searchingText,
    selectedIndex,
    selectedJobDescIndex,
    viewMode
})