import {createFilter} from 'react-search-input'

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
        gradeHistory: [],
        familyMember: [],
        location: []
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