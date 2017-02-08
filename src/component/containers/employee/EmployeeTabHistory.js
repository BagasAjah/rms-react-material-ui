import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeTabHistory from "../../employee/EmployeeTabHistory"
import { changeEditEmployees, changeNewEmployee, changeStateValue } from "../../action/EmployeeActions"

const mapStateToProps = (state) => ({
    currentEmployee: state.editedEmployee,
    newEmployee: state.newEmployee,
    openDialog: state.openDialog,
    selectedIndex: state.selectedIndex,
    selectedJobDescIndex: state.selectedJobDescIndex,
    viewMode: state.viewMode
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
	handleOpenDialogChanged(type, value){
        dispatch(
            changeStateValue(type, value)
        )
    },
	handleStateChanged(type, value){
        dispatch(
            changeStateValue(type, value)
        )
    }
})

const employeeTabHistory = connect(mapStateToProps)(EmployeeTabHistory);
export default withRouter(employeeTabHistory)