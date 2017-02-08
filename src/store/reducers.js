import C from '../constants'
import { combineReducers } from 'redux'
import update from 'react-addons-update';
import { setDefaultEmployee, searchEmployee } from "../component/lib/employee/employeeHelper"

const allEmployee = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_NEW_EMPLOYEE:
            return [
                ...state,
                action.employeeData
            ];
        default:
            return state;
    }
}

const currentEmployee = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_NEW_EMPLOYEE:
            return action.employeeData;
        case C.SET_EMPLOYEE:
            return action.currentEmployee;
        default:
            return state;
    }
}

const editedEmployee = (state = {}, action) => {
    switch (action.type) {
        case C.SET_EMPLOYEE:
            return action.currentEmployee;
        case C.CHANGE_EDIT_EMPLOYEE:
            return action.currentEmployee;
        default:
            return state;
    }
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
        default:
            return state;
    }
}

const newEmployee = (state = {}, action) => {
    switch (action.type) {
        case C.CHANGE_NEW_EMPLOYEE:
            return action.employeeData;
        default:
            return setDefaultEmployee();
    }
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
}

const searchingText = (state = {}, action) => {
    switch (action.type) {
        case C.FILTERING:
            return action.searchText;
        default:
            return state;
    }
}

const selectedIndex = (state = null, action) => {
    switch (action.type) {
        case C.SET_EMPLOYEE:
            return null;
        default:
            return state;
    }
}

const viewMode = (state = true, action) => {
    switch (action.type) {
        case C.SET_EMPLOYEE:
            return true;
        default:
            return state;
    }
}

export default combineReducers({
    allEmployee,
    currentEmployee,
    employees,
    editedEmployee,
    newEmployee,
    openDialog,
    searchingText,
    selectedIndex,
    viewMode
})