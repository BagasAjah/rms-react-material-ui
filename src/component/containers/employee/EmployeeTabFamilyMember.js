import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeTabFamilyMember from "../../employee/EmployeeTabFamilyMember"
import { handleStateChanged } from "../../../component/lib/employee/employeeHelper";
import { changeEditEmployees, changeNewEmployee, changeOpenDialogValue, changeOpenValidationMessage } from "../../action/EmployeeActions"

const mapStateToProps = (state, props) => ({
    currentEmployee: props.currentEmployee,
    newEmployee: state.newEmployee,
    openDialog: state.openDialog,
    openValidationMessage: state.openValidationMessage,
    pageMode: props.pageMode,
    selectedIndex: state.selectedIndex,
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
	handleStateChanged(type, value){
        dispatch(
            handleStateChanged(type, value)
        )
    }
})

const employeeTabFamilyMember = connect(mapStateToProps, mapDispatchToProps)(EmployeeTabFamilyMember);
export default withRouter(employeeTabFamilyMember)