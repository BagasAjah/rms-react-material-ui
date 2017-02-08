import C from '../../constants'

export function setEmployees(currentEmployee) {
    return {
        type: C.SET_EMPLOYEE,
        currentEmployee
    }
}

export function changeEditEmployees(currentEmployee) {
    return {
        type: C.CHANGE_EDIT_EMPLOYEE,
        currentEmployee
    }
}
