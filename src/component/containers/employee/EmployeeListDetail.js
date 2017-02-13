import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeListDetail from "../../employee/EmployeeListDetail"
import { setEmployees } from "../../action/EmployeeActions"

const mapStateToProps = (state, props) => ({
    key: props.key,
    index: props.index,
    employee: props.employee
})

const mapDispatchToProps = (dispatch) => ({
	setCurrentEmployee(employeesData){
	    dispatch(
            setEmployees(employeesData)
        )
	}
})

const employeeListDetail = connect(mapStateToProps, mapDispatchToProps)(EmployeeListDetail);
export default withRouter(employeeListDetail)