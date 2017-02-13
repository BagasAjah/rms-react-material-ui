import C from '../../constants';

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

export default currentEmployee;