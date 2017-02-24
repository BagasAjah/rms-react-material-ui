import DummyData from "./dummy_data/sampleEmployeeData"
import { setDefaultEmployee } from "./lib/employee/employeeHelper"

const initialState = {
    "allEmployee": [],
    "employees" : [],
    "currentEmployee": null,
    "currentTabLocation": '',
    "editedEmployee": null,
    "newEmployee": setDefaultEmployee(),
    "openDialog": {
        "gradeDialog": false,
        "historyDialog": false,
        "locationDialog": false,
        "newEmployeeDialog": false,
    },
    "openValidationMessage": {
        "gradeValidation": false,
        "locationValidation": false,
    },
    "searchingText": '',
    "selectedJobDescIndex": null,
    "selectedIndex": null,
    "viewMode": true
}
export default initialState