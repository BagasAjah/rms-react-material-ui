import C from '../../constants';
import { setDefaultEmployee } from "../../lib/employee/employeeHelper";

const newEmployee = (state = {}, action) => {
    switch (action.type) {
        case C.CHANGE_NEW_EMPLOYEE:
            return action.employeeData;
        default:
            return setDefaultEmployee();
    }
    return setDefaultEmployee();
}

export default newEmployee;
