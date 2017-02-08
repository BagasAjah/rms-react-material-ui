import C from '../../constants'

export const setEmployees = (currentEmployee) => {
    return {
        type: C.SET_EMPLOYEE,
        currentEmployee
    }
}

export const changeEditEmployees = (fieldName, value) => {
    return {
        type: C.CHANGE_EDIT_EMPLOYEE,
        payload: {
            fieldName: fieldName,
            value: value
        }
    }
}

export const changeStateValue = (fieldName, value) => {
    return {
        type: C.CHANGE_STATE_VALUE,
        payload: {
            fieldName: fieldName,
            value: value
        }
    }
}
