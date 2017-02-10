import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import NewEmployeeDialog from "../../employee/NewEmployeeDialog"
import { addEmployee, changeOpenDialogValue } from "../../action/EmployeeActions"

const mapStateToProps = (state) => ({
    newEmployee: state.newEmployee,
    openDialog: state.openDialog
})

const mapDispatchToProps = (dispatch) => ({
	addCurrentEmployee(employeesData){
	    dispatch(
            addEmployee(employeesData)
        )
	},
	handleOpenDialogChanged(type, value){
        dispatch(
            changeOpenDialogValue(type, value)
        )
    }
})
const newEmployeeDialog = connect(mapStateToProps, mapDispatchToProps)(NewEmployeeDialog);
export default withRouter(newEmployeeDialog)