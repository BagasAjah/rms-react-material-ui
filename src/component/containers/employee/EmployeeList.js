import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeList from "../component/employee/EmployeeList"

function mapStateToProps(state, props) {
	return {
	    console.dir(state);
		employees: state.employees,
	}
}

const employeeList = connect(null, null)(EmployeeList);
export default withRouter(employeeList)