import DummyData from "./dummy_data/sampleEmployeeData"
import { setDefaultEmployee } from "./lib/employee/employeeHelper"

const initialState = {
    "allEmployee": [],
    "employees" : [],
    "currentEmployee": null,
    "currentTabLocation": '',
    "editedEmployee": null,
    "fetchingEmployee": false,
    "lookUpData": {
        "gender": [],
        "statusMarital": [],
        "status":[],
        "grade": [],
        "division": [],
        "familyType": [],
        "location": []
    },
    "newEmployee": setDefaultEmployee(),
    "openDialog": {
        "gradeDialog": false,
        "historyDialog": false,
        "locationDialog": false,
        "newEmployeeDialog": false,
    },
    "openValidationMessage": {
        "detailValidation": false,
        "historyValidation": false,
        "gradeValidation": false,
        "locationValidation": false,
    },
    "enableToggle" : {
        "enableHistoryToggle": true,
    },
    "searchingText": '',
    "selectedJobDescIndex": null,
    "selectedIndex": null,
    "viewMode": true
}
export default initialState