import React, {Component} from 'react';
import { Link,browserHistory } from 'react-router'
import {Tabs, Tab} from 'material-ui/Tabs';
import {ToolbarGroup} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';

import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import ActionHistory from 'material-ui/svg-icons/action/history';
import ActionHome from 'material-ui/svg-icons/action/home';
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';
import MapsLayers from 'material-ui/svg-icons/maps/layers';
import NotificationWc from 'material-ui/svg-icons/notification/wc';

import EmployeeTabDetails from "./EmployeeTabDetails"
import EmployeeTabGradeHistory from "./EmployeeTabGradeHistory"
import EmployeeTabFamilyMember from "./EmployeeTabFamilyMember"
import EmployeeTabHistory from "./EmployeeTabHistory"
import EmployeeTabAddress from "./EmployeeTabAddress"
import EmployeeTabLocation from "./EmployeeTabLocation"

class EmployeeTab extends Component {

    constructor(props) {
        super(props);
        this.props.currentEmployee.gradeHistory.sort();
        this.props.currentEmployee.gradeHistory.reverse();
        this.state = {
            viewMode: true,
            employee: this.props.currentEmployee,
            currentTabLocation: ''
        };
        this.updateButtonClick = this.updateButtonClick.bind(this);
        this.editButtonClick = this.editButtonClick.bind(this);
        this.cancelButtonClick = this.cancelButtonClick.bind(this);
        this.deleteButtonClick = this.deleteButtonClick.bind(this);
        this.setSavedEmployee = this.setSavedEmployee.bind(this);
        this.employeeTabClick = this.employeeTabClick.bind(this);
    }

    componentWillMount(){
        var currentTabLocationHash = browserHistory.getCurrentLocation().hash;
        var lastslashindex = currentTabLocationHash.lastIndexOf('/');
        var currentTabLocation = currentTabLocationHash.substring(lastslashindex  + 1);
        (currentTabLocation == 'employee') ? currentTabLocation = 'details' : currentTabLocation;
        this.setState({currentTabLocation: currentTabLocation});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({employee: nextProps.currentEmployee});
        this.setState({viewMode: true});
    }

    updateButtonClick(){
        this.setState({viewMode: true});
        this.props.updateCurrentEmployee(this.state.employee);
    }

    editButtonClick(){
        this.setState({viewMode: false});
        this.setSavedEmployee(this.props.currentEmployee);
    }

    deleteButtonClick(){
        this.setState({
            employee: {
                id: '',
                firstName: ''
            },
            viewMode: true
            });
        this.props.deleteCurrentEmployee(this.state.employee);
    }

    cancelButtonClick(){
        this.setState({viewMode: true});
        this.setSavedEmployee(this.props.currentEmployee);
    }

    setSavedEmployee(employee){
        this.setState({employee: employee});
    }

    employeeTabClick(e){
        this.setState({currentTabLocation: e.props.value});
        browserHistory.push('#/employee/' + e.props.value);
    }

    render() {
        return (
            <div className="menu-tab">
                <Tabs value={this.state.currentTabLocation}>
                    <Tab icon={<ActionAccountBox />} value="details" onActive={this.employeeTabClick}>
                        <EmployeeTabDetails
                            viewMode={this.state.viewMode}
                            currentEmployee={this.state.employee}
                            setSavedEmployee={this.setSavedEmployee.bind(this)}/>
                    </Tab>
                    <Tab icon={<ActionHistory />} value="history" onActive={this.employeeTabClick}>
                        <EmployeeTabHistory
                                viewMode={this.state.viewMode}
                                currentEmployee={this.state.employee}
                                setSavedEmployee={this.setSavedEmployee.bind(this)}/>
                    </Tab>
                    <Tab icon={<MapsLayers />} value="grade" onActive={this.employeeTabClick}>
                        <EmployeeTabGradeHistory
                            viewMode={this.state.viewMode}
                            currentEmployee={this.state.employee}
                            setSavedEmployee={this.setSavedEmployee.bind(this)}/>
                    </Tab>
                    <Tab icon={<NotificationWc />} value="family" onActive={this.employeeTabClick}>
                        <EmployeeTabFamilyMember
                            viewMode={this.state.viewMode}
                            currentEmployee={this.state.employee}
                            setSavedEmployee={this.setSavedEmployee.bind(this)}/>
                    </Tab>
                    <Tab icon={<ActionHome />} value="address" onActive={this.employeeTabClick}>
                        <EmployeeTabAddress
                            viewMode={this.state.viewMode}
                            currentEmployee={this.state.employee}
                            setSavedEmployee={this.setSavedEmployee.bind(this)}/>
                    </Tab>
                    <Tab icon={<CommunicationLocationOn />} value="location" onActive={this.employeeTabClick}>
                        <EmployeeTabLocation
                            viewMode={this.state.viewMode}
                            currentEmployee={this.state.employee}
                            setSavedEmployee={this.setSavedEmployee.bind(this)}/>
                    </Tab>

                </Tabs>
                <div className="footer-content">
                    { (this.state.viewMode) ? (
                        <div>
                            <RaisedButton
                                label={"Edit"}
                                secondary={true}
                                className="footer-button"
                                onClick={this.editButtonClick}
                            />
                            <RaisedButton
                                label={"Delete"}
                                secondary={true}
                                className="footer-button"
                                onClick={this.deleteButtonClick}
                            />

                        </div> ):(
                        <div>
                            <RaisedButton
                                label={"Update"}
                                secondary={true}
                                className="footer-button"
                                onClick={this.updateButtonClick}
                            />
                            <RaisedButton
                                label={"Cancel"}
                                className="footer-button"
                                onClick={this.cancelButtonClick}
                            />
                        </div> )}
                </div>
            </div>
        )
    }
}

export default EmployeeTab;