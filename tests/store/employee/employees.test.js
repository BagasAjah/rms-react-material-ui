import C from '../../../src/constants';
import reducer from '../../../src/store/employee/employees'
import { setDefaultEmployee } from "../../../src/lib/employee/employeeHelper"

describe('employees reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual([])
    })

    it('should handle searching process', () => {
        const employee1 = setDefaultEmployee();
        employee1.id = 1;
        employee1.lastName = "Test";
        const employee2 = setDefaultEmployee();
        const state = [employee1, employee2];

        const expectedEmployee = setDefaultEmployee();
        expectedEmployee.id = 1;
        expectedEmployee.lastName = "Test";
        const expectedResult = [expectedEmployee];

        const action = {
            type : C.FILTERING,
            searchText: "Test",
            allEmployee: state
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