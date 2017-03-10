import { combineReducers } from 'redux';

import allEmployee from './employee/allEmployee'
import currentTabLocation from './employee/currentTabLocation'
import employees from './employee/employees'
import editedEmployee from './employee/editedEmployee'
import enableToggle from './employee/enableToggle'
import fetchingEmployee from './employee/fetchingEmployee'
import lookUpData from './employee/lookUpData'
import newEmployee from './employee/newEmployee'
import openDialog from './employee/openDialog'
import openValidationMessage from './employee/openValidationMessage'
import totalEmployees from './employee/totalEmployees'
import searchingText from './employee/searchingText'
import selectedIndex from './employee/selectedIndex'
import selectedJobDescIndex from './employee/selectedJobDescIndex'
import viewMode from './employee/viewMode'

export default combineReducers({
    allEmployee,
    currentTabLocation,
    employees,
    editedEmployee,
    enableToggle,
    fetchingEmployee,
    lookUpData,
    newEmployee,
    openDialog,
    openValidationMessage,
    totalEmployees,
    searchingText,
    selectedIndex,
    selectedJobDescIndex,
    viewMode
})