import C from '../../constants';
import update from 'react-addons-update';
import { searchEmployee } from "../../lib/employee/employeeHelper";

const employees = (state = [], action) => {
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
        case C.LOAD_EMLOYEE_DATA:
            return action.employees;
        default:
            return state;
    }
    return state;
}

export default employees;