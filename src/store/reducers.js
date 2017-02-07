import C from '../constants'
import { combineReducers } from 'redux'
import {setDefaultEmployee} from "../component/lib/employee/employeeHelper"

const employeeDetailReducer = () => {

}

const allEmployee = () => {

}

const employees = () => {

}

const currentEmployee = (state = setDefaultEmployee, action) => {
    switch (action.type) {
        case C.CHANGE_EMPLOYEE_VALUE:
            return action.payload
        default:
            return state;
    }
}

const currentTabLocation = () => {

}

const editedEmployee = () => {

}

const newEmployee = () => {

}

const gradeDialog = () => {

}

const historyDialog = () => {

}

export default combineReducers({
    currentEmployee,null
})