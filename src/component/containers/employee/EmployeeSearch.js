import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeSearch from "../../employee/EmployeeSearch"
import { setFilteringParam } from "../../action/EmployeeActions"

const mapStateToProps = (state) => ({
    allEmployee: state.allEmployee,
    employees: state.employees,
    searchingText: state.searchingText
})


const mapDispatchToProps = (dispatch) => ({
	setFilteringProps(searchingText, allEmployee){
	    dispatch(
            setFilteringParam(searchingText, allEmployee)
        )
	}
})

const employeeSearch = connect(mapStateToProps, mapDispatchToProps)(EmployeeSearch);
export default withRouter(employeeSearch)