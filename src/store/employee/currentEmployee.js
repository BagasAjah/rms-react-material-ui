import C from '../../constants';
import { setDefaultEmployee } from "../../lib/employee/employeeHelper";

const currentEmployee = (state = {}, action) => {
   switch (action.type) {
       case C.ADD_NEW_EMPLOYEE:
           return action.employeeData;
       case C.SET_EMPLOYEE:
           return action.currentEmployee[0];
       case C.DELETE_CURRENT_EMPLOYEE:
           return setDefaultEmployee();
       case C.UPDATE_CURRENT_EMPLOYEE:
           return action.employeeData;
        case C.LOAD_EMLOYEE_DATA:
            return action.employees[0];
       default:
           return state;
   }
   return state;
}

export default currentEmployee;