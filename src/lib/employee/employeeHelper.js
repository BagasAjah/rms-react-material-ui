import {createFilter} from 'react-search-input'
import update from 'react-addons-update';
import moment from 'moment';
import {
        changeViewModeValue, changePathValue, changeNewEmployee,
        changeSelectecIndex, changeSelectecJobDescIndex
       } from "../../component/action/EmployeeActions"

const KEYS_TO_FILTERS = ['firstName', 'lastName'];

export const setDefaultEmployee = () => ({
    employeeGuid: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: null,
    nationality: '',
    maritalStatus: '',
    phone: '',
    subDivision: '',
    status: '',
    suspendDate: null,
    hireDate: null,
    grade: '',
    division: '',
    email: '',
    office: '',
    history:[{
        historyStartDate: null,
        historyEndDate: null,
        company: '',
        position: '',
        jobDesc: []
    }],
    gradeHistory: [{
        ds: '',
        grade: '',
        startDate: null,
        endDate: null
    }],
    familyMember: [{
        familyName: '',
        familyGender: '',
        familyDob: null,
        familyType: '',
        isActive: false
    }],
    location: [{
        officeStartDate: null,
        officeEndDate: null,
        officeLocation: '',
        officeAddress: ''
    }]
})

export const setNewEmployee = () => ({
    employeeGuid: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: null,
    nationality: '',
    maritalStatus: '',
    phone: '',
    subDivision: '',
    status: '',
    suspendDate: null,
    hireDate: null,
    grade: '',
    division: '',
    email: '',
    office: '',
    history:[],
    gradeHistory: [],
    familyMember: [],
    location: []
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

export const parseStringToDate = dateStr => (
    dateStr !== null ? new Date(moment(dateStr).format("YYYY-MM-DD").toString()) : new Object
)

export const handleDataBeforeSaveOrUpdate = employeeData => {
    let grade = employeeData.gradeHistory;
    for (var i = 0; i < grade.length; i++) {
        if (isEmpty(grade[i].ds) && isEmpty(grade[i].grade) && isEmpty(grade[i].startDate) && isEmpty(grade[i].endDate)) {
            delete grade[i];
        }
    }
    if (grade.length = 0) {
        employeeData.gradeHistory = [];
    }

    let history = employeeData.history;
    for (var i = 0; i < history.length; i++) {
        let jobdesc = history.jobDesc;
        if (isEmpty(history[i].historyStartDate) && isEmpty(history[i].historyEndDate) && isEmpty(history[i].company)
            && isEmpty(history[i].position && jobdesc.length == 0)) {
            delete history[i];
        }
    }
    if (history.length = 0) {
        employeeData.history = [];
    }

    let familyMember = employeeData.familyMember;
    for (var i = 0; i < familyMember.length; i++) {
        if (isEmpty(familyMember[i].familyName) && isEmpty(familyMember[i].familyGender) && isEmpty(familyMember[i].familyDob) && isEmpty(familyMember[i].familyType)) {
            delete familyMember[i];
        }
    }
    if (familyMember.length = 0) {
        employeeData.familyMember = [];
    }

    let location = employeeData.location;
    for (var i = 0; i < grade.length; i++) {
        if (isEmpty(location[i].officeStartDate) && isEmpty(location[i].officeEndDate) && isEmpty(location[i].officeLocation) && isEmpty(location[i].officeAddress)) {
            delete location[i];
        }
    }
    if (location.length = 0) {
        employeeData.location = [];
    }

    return employeeData;
}

export const isEmpty = data => {
    if (data === '' || data == null) {
        return true;
    }
    return false;
}