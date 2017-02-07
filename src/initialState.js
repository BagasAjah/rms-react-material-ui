import DummyData from "./dummy_data/sampleEmployeeData"
import {setDefaultEmployee} from "./component/lib/employee/employeeHelper"

const initialState = {
    "allEmployee": DummyData,
    "employees" : DummyData,
    "currentEmployee": DummyData[0],
    "currentTabLocation": '',
    "editedEmployee": DummyData[0],
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