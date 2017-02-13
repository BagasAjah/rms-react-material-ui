import C from '../../constants';

const searchingText = (state = {}, action) => {
    switch (action.type) {
        case C.FILTERING:
            return action.searchText;
        default:
            return state;
    }
    return state;
}

export default searchingText;