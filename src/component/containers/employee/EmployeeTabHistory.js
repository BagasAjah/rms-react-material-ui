import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeTabHistory from "../../employee/EmployeeTabHistory"
import { handleStateChanged } from "../../../component/lib/employee/employeeHelper";
import { changeEditEmployees, changeNewEmployee, changeOpenDialogValue, changeStateValue } from "../../action/EmployeeActions"

const mapStateToProps = (state, props) => ({
    currentEmployee: props.currentEmployee,
    newEmployee: state.newEmployee,
    openDialog: state.openDialog,
    pageMode: props.pageMode,
    viewMode: props.viewMode
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
            changeOpenDialogValue(type, value)
        )
    },
	handleStateChanged(type, value){
        dispatch(
            handleStateChanged(type, value)
        )
    }
})

const employeeTabHistory = connect(mapStateToProps, mapDispatchToProps)(EmployeeTabHistory);
export default withRouter(employeeTabHistory)