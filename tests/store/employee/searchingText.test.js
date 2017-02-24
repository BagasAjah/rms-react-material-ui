import C from '../../../src/constants';
import reducer from '../../../src/store/employee/searchingText'

describe('searchingText reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual({})
    })

    it('should handle filtering process', () => {
        const state = '';
        const action = {
            type : C.FILTERING,
            searchText : "Test"
        }
        expect(
            reducer(state, action)
        ).toEqual("Test")
    })
})