import {createFilter} from 'react-search-input'
import update from 'react-addons-update';
import moment from 'moment';
import {
        changeViewModeValue, changePathValue, changeNewEmployee,
        changeSelectecIndex, changeSelectecJobDescIndex
       } from "../../component/action/EmployeeActions"

const KEYS_TO_FILTERS = ['firstName', 'lastName'];

export const setDefaultEmployee = () => ({
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
})

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

export const handleStateChanged = (type, value) => {
    if (type === 'viewMode') {
        return changeViewModeValue(value);
    } else if (type === 'currentTabLocation') {
        return changePathValue(value);
    } else if (type === 'selectedIndex') {
        return changeSelectecIndex(value);
    } else if (type === 'selectedJobDescIndex') {
        return changeSelectecJobDescIndex(value);
    } else if (type === 'newEmployee') {
        return changeNewEmployee(value);
    }
}

export const parseStringToDate = (dateStr) => (
    dateStr !== null ? new Date(moment(dateStr).format("YYYY-MM-DD").toString()) : new Object
)