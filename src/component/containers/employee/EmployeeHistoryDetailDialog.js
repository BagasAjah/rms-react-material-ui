import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeHistoryDetailDialog from "../../employee/EmployeeHistoryDetailDialog"
import { handleStateChanged } from "../../../lib/employee/employeeHelper";
import { changeEditEmployees, changeNewEmployee } from "../../action/EmployeeActions"

const mapStateToProps = (state, props) => ({
    newEmployee: state.newEmployee
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

const employeeHistoryDetailDialog = connect(mapStateToProps, mapDispatchToProps)(EmployeeHistoryDetailDialog);
export default withRouter(employeeHistoryDetailDialog)