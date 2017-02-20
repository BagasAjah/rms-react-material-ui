import C from '../../constants';
import { setDefaultEmployee } from "../../lib/employee/employeeHelper";

const editedEmployee = (state = {}, action) => {
    switch (action.type) {
        case C.SET_EMPLOYEE:
            return action.currentEmployee[0];
        case C.CHANGE_EDIT_EMPLOYEE:
            return action.currentEmployee;
        case C.DELETE_CURRENT_EMPLOYEE:
            return setDefaultEmployee();
        case C.LOAD_EMLOYEE_DATA:
            return action.employees[0];
        default:
            return state;
    }
    return state;
}

export default editedEmployee;