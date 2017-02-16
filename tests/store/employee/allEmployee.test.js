import C from '../../../src/constants';
import reducer from '../../../src/store/employee/allEmployee'
import { setDefaultEmployee } from "../../../src/lib/employee/employeeHelper"

describe('allEmployee reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual([])
    })

    it('should handle add new employee process', () => {
        const state = [];

        const expectedEmployee = setDefaultEmployee();
        expectedEmployee.id = 1;
        expectedEmployee.lastName = "Test";
        const expectedResult = [expectedEmployee];

        const action = {
            type : C.ADD_NEW_EMPLOYEE,
            employeeData: expectedEmployee,
        }
        expect(
            reducer(state, action)
        ).toEqual(expectedResult)
    })

    it('should handle delete existing employee process', () => {
        const employee1 = setDefaultEmployee();
        employee1.id = 1;
        employee1.lastName = "Test";
        const employee2 = setDefaultEmployee();
        employee2.id = 2;
        const state = [employee1, employee2];

        const expectedEmployee = setDefaultEmployee();
        expectedEmployee.id = 1;
        expectedEmployee.lastName = "Test";
        const expectedResult = [expectedEmployee];

        const employeeToBeDeleted = setDefaultEmployee();
        employeeToBeDeleted.id = 2;

        const action = {
            type : C.DELETE_CURRENT_EMPLOYEE,
            employeeData: employeeToBeDeleted
        }
        expect(
            reducer(state, action)
        ).toEqual(expectedResult)
    })

    it('should handle change state process', () => {
        const employee = setDefaultEmployee();
        employee.id = 1;
        const state = [employee];

        const expectedEmployee = setDefaultEmployee();
        expectedEmployee.id = 1;
        expectedEmployee.lastName = "Test";
        const expectedResult = [expectedEmployee];

        const action = {
            type : C.UPDATE_CURRENT_EMPLOYEE,
            employeeData: expectedEmployee,
        }
        expect(
            reducer(state, action)
        ).toEqual(expectedResult)
    })
})