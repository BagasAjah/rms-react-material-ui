import C from '../../constants';
import { setDefaultEmployee } from "../../lib/employee/employeeHelper";

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

export default editedEmployee;