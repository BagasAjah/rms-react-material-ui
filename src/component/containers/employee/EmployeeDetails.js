import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeDetails from "../../../layout/EmployeeDetails"
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../action/EmployeeActions';

const mapDispatchToProps = (dispatch) => (
	bindActionCreators(actionCreators, dispatch)
)

const employeeDetails = connect(null, mapDispatchToProps)(EmployeeDetails);
export default withRouter(employeeDetails)