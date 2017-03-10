import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeList from "../../employee/EmployeeList"
import { loadEmployeeData } from "../../action/EmployeeActions"

const mapStateToProps = (state) => ({
    employees: state.employees,
    totalEmployees: state.totalEmployees
})
const mapDispatchToProps = (dispatch) => ({
	loadEmployeeData(page){
        dispatch(loadEmployeeData(page))
	}
})
const employeeList = connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
export default withRouter(employeeList)