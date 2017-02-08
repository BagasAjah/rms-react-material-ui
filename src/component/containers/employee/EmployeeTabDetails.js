import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeTabDetails from "../../employee/EmployeeTabDetails"
import { setEmployee, changeEditEmployees } from "../../action/EmployeeActions"

const mapStateToProps = (state) => ({
    currentEmployee: state.editedEmployee,
    viewMode: state.viewMode
})


const mapDispatchToProps = (dispatch) => ({
	setSavedEmployee(employeesData){
	    dispatch(
            changeEditEmployees(employeesData)
        )
	}
})

const employeeTabDetails = connect(mapStateToProps)(EmployeeTabDetails);
export default withRouter(employeeTabDetails)