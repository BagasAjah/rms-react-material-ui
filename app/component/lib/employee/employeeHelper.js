import {createFilter} from 'react-search-input'
import update from 'react-addons-update';

const KEYS_TO_FILTERS = ['firstName', 'lastName'];

export const setDefaultEmployee = () => {
    const employee = new Object;
    return {
        id: 0,
        firstName: '',
        lastName: '',
        gender: '',
        dob: new Object,
        nationality: '',
        maritalStatus: '',
        phone: '',
        subDivision: '',
        status: '',
        suspendDate: new Object,
        hireDate: new Object,
        grade: '',
        division: '',
        email: '',
        office: '',
        history:[{
            historyStartDate: new Object,
            historyEndDate: new Object,
            company: '',
            position: '',
            jobDesc: []
        }],
        gradeHistory: [{
            ds: '',
            grade: '',
            startDate: new Object,
            endDate: new Object
        }],
        familyMember: [{
            familyName: '',
            familyGender: '',
            familyDob: new Object,
            familyType: '',
            isActive: false
        }],
        location: [{
            officeStartDate: new Object,
            officeEndDate: new Object,
            officeLocation: '',
            officeAddress: ''
        }]
    }
}

export const searchEmployee = (employees, searchingText) => {
    var filterMode = false;
    var filteredEmployee = {};
    if (searchingText.length > 2) {
        filteredEmployee = employees.filter(createFilter(searchingText, KEYS_TO_FILTERS));
        filterMode = true;
    } else {
        filterMode = false;
    }
    if (filterMode) {
        return filteredEmployee;
    } else {
        return employees;
    }
}

export const handleEmployeeDetailsInfo = (type, field, value, employee) => {
    var updatedEmployee = update(employee, {
        [type]: {
            0: {
                [field]:  {$set: value}
            }
        }
    });
    return updatedEmployee;
}