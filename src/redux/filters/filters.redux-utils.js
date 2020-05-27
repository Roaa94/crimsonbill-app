export const setFilterValueInState = (state, {filterName, filterValue}) => {
    return {
        ...state,
        [filterName]: filterValue,
    }
}