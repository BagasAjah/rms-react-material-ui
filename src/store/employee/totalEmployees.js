import C from '../../constants';

const totalEmployees = (state = true, action) => {
    switch (action.type) {
        case C.LOAD_AND_SET_EMLOYEE_DATA:
        case C.LOAD_EMLOYEE_DATA:
            return action.total;
        default:
            return state;
    }
    return state;
}

export default totalEmployees;