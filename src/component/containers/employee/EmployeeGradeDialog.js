import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeGradeDialog from "../../employee/EmployeeGradeDialog"
import { handleStateChanged } from "../../../lib/employee/employeeHelper";
import { changeEditEmployees, changeNewEmployee } from "../../action/EmployeeActions"

const mapStateToProps = (state, props) => ({
    currentEmployee: props.currentEmployee,
    newEmployee: state.newEmployee,
    openValidationMessage: state.openValidationMessage,
    pageMode: props.pageMode
})

const mapDispatchToProps = (dispatch) => ({
	setSavedEmployee(employeesData, pageMode){
        if (pageMode === 'EDIT'){
            dispatch(
                changeEditEmployees(employeesData)
            )
        } else {
            dispatch(
                changeNewEmployee(employeesData)
            )
        }
	},
	handleStateChanged(type, value){
        dispatch(
            handleStateChanged(type, value)
        )
    }
})

const employeeGradeDialog = connect(mapStateToProps, mapDispatchToProps)(EmployeeGradeDialog);
export default withRouter(employeeGradeDialog)