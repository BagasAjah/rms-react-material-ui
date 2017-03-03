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

export const fetchEmployee = value => ({
    type: C.FECTHING_EMPLOYEE,
    value
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

export const loadEmployeeData = () => dispatch => {
    dispatch(fetchEmployee(true));
    return fetchingEmployee()
    .then(response => response.json())
    .then(employees => {
        dispatch({
            type : C.LOAD_AND_SET_EMLOYEE_DATA,
            employees
        })
    })
    .then(() => (
        dispatch(fetchEmployee(false))
    ))
}

export const setEmployees = employeeGuid => dispatch => {
    fetchingById(employeeGuid)
        .then(response => response.json())
        .then(currentEmployee => {
            dispatch({
                type: C.SET_EMPLOYEE,
                currentEmployee
            })
        })
}

export const deleteCurrentEmployee = employeeGuid => dispatch => {
    dispatch(fetchEmployee(true));
    return fetchDeleteEmployee(employeeGuid)
    .then(response => {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        dispatch(loadEmployeeData());
    })
    .then(() => (
        dispatch(fetchEmployee(false))
    ))
}

export const addEmployee = employeeData => dispatch => {
    dispatch(fetchEmployee(true));
    return fetchPostEmployee(employeeData)
    .then((response) => {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(response => {
        dispatch(loadData())
        return response.data;
    })
    .then(guid => {
        dispatch(setEmployees(guid))
    })
    .then(() => {
        dispatch(changeOpenDialogValue('newEmployeeDialog', false));
        dispatch(fetchEmployee(false));
    })
}

export const updateCurrentEmployee = employeeData => dispatch => {
    dispatch(fetchEmployee(true));
    return fetchPutEmployee(employeeData)
    .then((response) => {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(response => {
        dispatch(loadData())
        return response.data;
    })
    .then(guid => {
        dispatch(setEmployees(guid))
    })
    .then(() => (
        dispatch(fetchEmployee(false))
    ))
}

const fetchLookupByType = lookupType => {
    return fetch("http://localhost:8080/api/lookup/" + lookupType)
}

export const getLookupByTpe = lookupType => dispatch => {
    fetchLookupByType(lookupType)
    .then(response => response.json())
    .then(lookup => {
        dispatch({
            type: C.CHANGE_LOOKUP_VALUE,
            lookup
        })
    })
}