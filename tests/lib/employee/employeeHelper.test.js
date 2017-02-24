import C from '../../../src/constants';
import { handleEmployeeDetailsInfo, handleStateChanged, searchEmployee, setDefaultEmployee } from '../../../src/lib/employee/employeeHelper'

describe('test employeeHelper class', () => {
    it('should handle searching process with found data', () => {
        const employee = setDefaultEmployee();
        employee.firstName = 'Test';
        const employees = [employee];

        expect(
            searchEmployee(employees, 'Test')
        ).toEqual(employees)
    })

    it('should handle searching process with not found data', () => {
        const employee = setDefaultEmployee();
        const employees = [employee];

        expect(
            searchEmployee(employees, 'Test')
        ).toEqual([])
    })

    it('should handle edit employee process', () => {
        const employee = setDefaultEmployee();
        employee.history[0].company = 'PT. Mitrais';

        expect(
            handleEmployeeDetailsInfo('history', 'company', 'PT. Mitrais', setDefaultEmployee())
        ).toEqual(employee)
    })

    it('should handle change state process', () => {
        const expectedAction = {
          type: C.CHANGE_VIEW_MODE_VALUE,
          value: true
        }
        expect(
            handleStateChanged('viewMode', true)
        ).toEqual(expectedAction)
    })
})