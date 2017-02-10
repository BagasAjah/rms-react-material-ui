import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeTab from "../../employee/EmployeeTab"
import { changeViewModeValue, changePathValue, deleteCurrentEmployee, updateCurrentEmployee } from "../../action/EmployeeActions"

const mapStateToProps = (state) => ({
    allEmployee: state.allEmployee,
    currentEmployee: state.currentEmployee,
    currentTabLocation: state.currentTabLocation,
    editedEmployee: state.editedEmployee,
    viewMode: state.viewMode
})


const mapDispatchToProps = (dispatch) => ({
	handleStateChanged(fieldName, value){
        if (fieldName === 'viewMode') {
            dispatch(
                changeViewModeValue(value)
            )
        } else if(fieldName === 'currentTabLocation') {
            dispatch(
                changePathValue(value)
            )
        }
	},
	updateCurrentEmployee(employeeData){
        dispatch(
            updateCurrentEmployee(employeeData)
        )
	},
	deleteCurrentEmployee(employeeData){
        dispatch(
            deleteCurrentEmployee(employeeData)
        )
	}
})

const employeeTab = connect(mapStateToProps, mapDispatchToProps)(EmployeeTab);
export default withRouter(employeeTab)