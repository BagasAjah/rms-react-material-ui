import C from '../../constants';
import { setDefaultEmployee } from "../../lib/employee/employeeHelper";

const currentEmployee = (state = {}, action) => {
   switch (action.type) {
       case C.SET_EMPLOYEE:
           return action.currentEmployee;
       case C.UPDATE_CURRENT_EMPLOYEE:
           return action.employeeData;
        case C.LOAD_AND_SET_EMLOYEE_DATA:
            return action.employees.length > 0 ? action.employees[0]: setDefaultEmployee();
       default:
           return state;
   }
   return state;
}

export default currentEmployee;