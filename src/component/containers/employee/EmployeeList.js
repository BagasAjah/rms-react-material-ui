import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeList from "../../employee/EmployeeList"
import { setEmployee } from "../../action/EmployeeActions"

const mapStateToProps = (state) => ({
    employees: state.employees
})

const employeeList = connect(mapStateToProps)(EmployeeList);
export default withRouter(employeeList)