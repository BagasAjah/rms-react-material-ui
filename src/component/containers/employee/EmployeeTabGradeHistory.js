import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeTabGradeHistory from "../../employee/EmployeeTabGradeHistory"
import { handleStateChanged } from "../../../component/lib/employee/employeeHelper";
import { changeEditEmployees, changeNewEmployee, changeOpenDialogValue, changeOpenValidationMessage } from "../../action/EmployeeActions"

const mapStateToProps = (state, props) => ({
    currentEmployee: props.currentEmployee,
    newEmployee: state.newEmployee,
    openDialog: state.openDialog,
    openValidationMessage: state.openValidationMessage,
    pageMode: props.pageMode,
    viewMode: props.viewMode
})

const mapDispatchToProps = (dispatch) => ({
	setSavedEmployee(employeesData, pageMode){
        dispatch(
            changeEditEmployees(employeesData)
        )
    },
	handleOpenDialogChanged(type, value){
        dispatch(
            changeOpenDialogValue(type, value)
        )
    },
    handleOpenValidationMessage(type, value) {
        dispatch(
            changeOpenValidationMessage(type, value)
        )
    },
	handleStateChanged(type, value){
        dispatch(
            handleStateChanged(type, value)
        )
    }
})

const employeeTabGradeHistory = connect(mapStateToProps, mapDispatchToProps)(EmployeeTabGradeHistory);
export default withRouter(employeeTabGradeHistory)