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

export const changeToggleValue = (fieldName, value) => ({
    type: C.CHANGE_TOGGLE_VALUE,
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

export const changePageDetailValue = (fieldName, value) => ({
    type: C.CHANGE_PAGE_DETAIL_VALUE,
    typeState: fieldName,
    value: value
})

const fetchingEmployee = (page, sort) => {
    let fetchURL = C.BASE_URL + "/employees?page=" + page + "&size=" + C.PAGE_DATA_SIZE;
    if (sort != null) {
        fetchURL = fetchURL + sort;
    }
    return fetch(fetchURL)
}

const fetchingById = id => {
    return fetch(C.BASE_URL + "/employee/" + id)
}

const fetchDeleteEmployee = employeeGuid => {
    return fetch(C.BASE_URL + "/employee/" + employeeGuid, {method: 'DELETE'})
}

const fetchPostEmployee = employee => {
    return fetch(C.BASE_URL + "/employee/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    })
}

const fetchPutEmployee = employee => {
    return fetch(C.BASE_URL + "/employee/", {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    })
}

const fetchLookupByType = lookupType => {
    return fetch("http://localhost:8080/api/lookup/" + lookupType)
}

const loadData = () => dispatch => (
    fetchingEmployee(0, '')
        .then(response => response.json())
        .then(response => {
            let employees = response.result;
            let total = response.total;
            dispatch({
                type : C.LOAD_EMLOYEE_DATA,
                employees
            })
            dispatch({
                type : C.CHANGE_PAGE_DETAIL_VALUE,
                typeState: "totalEmployees",
                value : total,
            })
            dispatch({
                type : C.CHANGE_PAGE_DETAIL_VALUE,
                typeState: "currentPage",
                value : 1,
            })
        })
)

export const loadEmployeeData = (page, sort) => dispatch => {
    dispatch(fetchEmployee(true));
    return fetchingEmployee(page,sort)
    .then(response => response.json())
    .then(response => {
        let employees = response.result;
        let total = response.total;
        dispatch({
            type : C.LOAD_AND_SET_EMLOYEE_DATA,
            employees
        })
        dispatch({
            type : C.CHANGE_PAGE_DETAIL_VALUE,
            typeState: "totalEmployees",
            value : total,
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
        dispatch(loadEmployeeData(0));
    })
    .then(() => (
        dispatch({
            type : C.CHANGE_PAGE_DETAIL_VALUE,
            typeState: "currentPage",
            value : 1,
        })
    ))
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