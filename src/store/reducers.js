import C from '../constants'
import { combineReducers } from 'redux'
import {setDefaultEmployee} from "../component/lib/employee/employeeHelper"

const currentEmployee = (state = {}, action) => {
    switch (action.type) {
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
    currentEmployee,
    editedEmployee,
    selectedIndex,
    viewMode
})