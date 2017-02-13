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

export const deleteCurrentEmployee = (employeeData) => ({
    type: C.DELETE_CURRENT_EMPLOYEE,
    employeeData
})

export const updateCurrentEmployee = (employeeData) => ({
    type: C.UPDATE_CURRENT_EMPLOYEE,
    employeeData
})

export const setFilteringParam = (searchText, allEmployee) => ({
    type: C.FILTERING,
    searchText: searchText,
    allEmployee: allEmployee
})
