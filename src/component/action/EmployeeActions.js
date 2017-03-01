import C from '../../constants'
import fetch from 'isomorphic-fetch'

export const changeEditEmployees = (currentEmployee) => ({
    type: C.CHANGE_EDIT_EMPLOYEE,
    currentEmployee
})

export const changeNewEmployee = (employeeData) => ({
    type: C.CHANGE_NEW_EMPLOYEE,
    employeeData
})

export const changeViewModeValue = (value) => ({
    type: C.CHANGE_VIEW_MODE_VALUE,
    value: value
})

export const changeOpenDialogValue = (fieldName, value) => ({
    type: C.CHANGE_OPEN_DIALOG_VALUE,
    fieldName: fieldName,
    value: value
})

export const changePathValue = (value) => ({
    type: C.CHANGE_PATH_VALUE,
    value: value
})

export const changeSelectecIndex = (value) => ({
    type: C.CHANGE_SELECTED_INDEX,
    value: value
})

export const changeSelectecJobDescIndex = (value) => ({
    type: C.CHANGE_SELECTED_JOBDESC_INDEX,
    value: value
})

export const changeOpenValidationMessage = (fieldName, value) => ({
    type: C.CHANGE_VALIDATION,
    fieldName: fieldName,
    value: value
})

export const setFilteringParam = (searchText, allEmployee) => ({
    type: C.FILTERING,
    searchText: searchText,
    allEmployee: allEmployee
})

const fetchingEmployee = () => {
    return fetch("http://localhost:8080/api/employees")
}

const fetchingById = id => {
    return fetch("http://localhost:8080/api/employee/" + id)
}

const fetchDeleteEmployee = employeeGuid => {
    return fetch("http://localhost:8080/api/employee/" + employeeGuid, {method: 'DELETE'})
}

const fetchPostEmployee = employee => {
    return fetch("http://localhost:8080/api/employee/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    })
}

const fetchPutEmployee = employee => {
    return fetch("http://localhost:8080/api/employee/", {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    })
}

const loadData = () => dispatch => (
    fetchingEmployee()
        .then(response => response.json())
        .then(employees => {
            dispatch({
                type : C.LOAD_EMLOYEE_DATA,
                employees
            })
        })
)

export const loadEmployeeData = () => dispatch => (
    fetchingEmployee()
        .then(response => response.json())
        .then(employees => {
            dispatch({
                type : C.LOAD_AND_SET_EMLOYEE_DATA,
                employees
            })
        })
)

export const setEmployees = employeeGuid => dispatch => (
    fetchingById(employeeGuid)
        .then(response => response.json())
        .then(currentEmployee => {
            dispatch({
                type: C.SET_EMPLOYEE,
                currentEmployee
            })
        })
)

export const deleteCurrentEmployee = employeeGuid => dispatch => (
    fetchDeleteEmployee(employeeGuid)
        .then(response => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            dispatch(loadEmployeeData());
        })
)

export const addEmployee = employeeData => dispatch => (
    fetchPostEmployee(employeeData)
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then(response => {
            dispatch(loadData(response.data))
        })
)

export const updateCurrentEmployee = employeeData => dispatch => (
    fetchPutEmployee(employeeData)
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then(response => {
            dispatch(loadData(response.data))
        })
)