import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeDetails from "../../../layout/EmployeeDetails"

function mapStateToProps(state) {
	return {
		employees: state.employees,
	}
}

const employeeDetails = connect(null, null)(EmployeeDetails);
export default withRouter(employeeDetails)