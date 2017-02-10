import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeHistoryDetail from "../../employee/EmployeeHistoryDetail"
import { handleStateChanged } from "../../../component/lib/employee/employeeHelper";
import { changeEditEmployees, changeNewEmployee, changeOpenDialogValue, changeStateValue } from "../../action/EmployeeActions"

const mapStateToProps = (state, props) => ({
    key: props.key,
    historyIndex: props.historyIndex,
    history: props.history,
    currentEmployee: props.currentEmployee,
    selectedIndex: state.selectedIndex,
    selectedJobDescIndex: state.selectedJobDescIndex,
    viewMode: state.viewMode
})

const mapDispatchToProps = (dispatch) => ({
	setSavedEmployee(employeesData, pageMode){
        dispatch(
            changeEditEmployees(employeesData)
        )
    },
	handleStateChanged(type, value){
        dispatch(
            handleStateChanged(type, value)
        )
    }
})

const employeeHistoryDetail = connect(mapStateToProps, mapDispatchToProps)(EmployeeHistoryDetail);
export default withRouter(employeeHistoryDetail)