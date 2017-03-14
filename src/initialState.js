import DummyData from "./dummy_data/sampleEmployeeData"
import { setDefaultEmployee } from "./lib/employee/employeeHelper"

const initialState = {
    "allEmployee": [],
    "employees" : [],
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
        "sortingDialog": false,
    },
    "openValidationMessage": {
        "detailValidation": false,
        "historyValidation": false,
        "gradeValidation": false,
        "familyValidation": false,
        "locationValidation": false,
    },
    "enableToggle" : {
        "enableHistoryToggle": true,
        "enableGradeToggle": true,
        "enableLocationToggle": true,
    },
    "pageDetail": {
        "totalEmployees": 1,
        "currentPage": 1,
        "sortCriteria": [],
    },
    "searchingText": '',
    "selectedJobDescIndex": null,
    "selectedIndex": null,
    "viewMode": true
}
export default initialState