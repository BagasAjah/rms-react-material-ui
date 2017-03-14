import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import EmployeeSearch from "../../employee/EmployeeSearch"
import { changeOpenDialogValue, setFilteringParam, changePageDetailValue, loadEmployeeData } from "../../action/EmployeeActions"

const mapStateToProps = (state) => ({
    allEmployee: state.allEmployee,
    employees: state.employees,
    openDialog: state.openDialog,
    pageDetail: state.pageDetail,
    searchingText: state.searchingText
})


const mapDispatchToProps = (dispatch) => ({
	setFilteringProps(searchingText, allEmployee){
	    dispatch(
            setFilteringParam(searchingText, allEmployee)
        )
	},
	handleOpenDialogChanged(type, value){
        dispatch(
            changeOpenDialogValue(type, value)
        )
    },
	changePageDetailValue(fieldName, value){
	    dispatch(
	        changePageDetailValue(fieldName, value)
        )
	},
	loadEmployees(page,sort){
        dispatch(
            loadEmployeeData(page,sort)
        )
	},
})

const employeeSearch = connect(mapStateToProps, mapDispatchToProps)(EmployeeSearch);
export default withRouter(employeeSearch)