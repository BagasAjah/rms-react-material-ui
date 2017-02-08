import C from '../../constants'

export const addEmployee = (employeeData) => ({
    type: C.ADD_NEW_EMPLOYEE,
    employeeData
})
export const setEmployees = (currentEmployee) => ({
    type: C.SET_EMPLOYEE,
    currentEmployee
})

export const changeEditEmployees = (currentEmployee) => ({
    type: C.CHANGE_EDIT_EMPLOYEE,
    currentEmployee
})

export const changeNewEmployee = (employeeData) => ({
    type: C.CHANGE_NEW_EMPLOYEE,
    employeeData
})

export const changeStateValue = (fieldName, value) => ({
    type: C.CHANGE_STATE_VALUE,
    payload: {
        fieldName: fieldName,
        value: value
    }
})

export const changeOpenDialogValue = (fieldName, value) => ({
    type: C.CHANGE_OPEN_DIALOG_VALUE,
    fieldName: fieldName,
    value: value
})

export const setFilteringParam = (searchText, allEmployee) => ({
    type: C.FILTERING,
    searchText: searchText,
    allEmployee: allEmployee
})
