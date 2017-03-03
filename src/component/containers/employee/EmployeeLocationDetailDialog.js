import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeLocationDetailDialog from "../../employee/EmployeeLocationDetailDialog"
import { handleStateChanged } from "../../../lib/employee/employeeHelper";
import { changeEditEmployees, changeNewEmployee } from "../../action/EmployeeActions"

const mapStateToProps = (state, props) => ({
    lookUpData : state.lookUpData,
    openValidationMessage: state.openValidationMessage,
    newEmployee: state.newEmployee,
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

const employeeLocationDetailDialog = connect(mapStateToProps, mapDispatchToProps)(EmployeeLocationDetailDialog);
export default withRouter(employeeLocationDetailDialog)