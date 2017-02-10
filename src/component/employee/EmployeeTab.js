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

import EmployeeTabDetails from "../containers/employee/EmployeeTabDetails"
import EmployeeTabGradeHistory from "../containers/employee/EmployeeTabGradeHistory"
import EmployeeTabFamilyMember from "../containers/employee/EmployeeTabFamilyMember"
import EmployeeTabHistory from "../containers/employee/EmployeeTabHistory"
import EmployeeTabAddress from "./EmployeeTabAddress"
import EmployeeTabLocation from "../containers/employee/EmployeeTabLocation"

class EmployeeTab extends Component {

    constructor(props) {
        super(props);
        this.props.editedEmployee.gradeHistory.sort();
        this.props.editedEmployee.gradeHistory.reverse();
        this.updateButtonClick = this.updateButtonClick.bind(this);
        this.editButtonClick = this.editButtonClick.bind(this);
        this.cancelButtonClick = this.cancelButtonClick.bind(this);
        this.deleteButtonClick = this.deleteButtonClick.bind(this);
        this.setSavedEmployee = this.setSavedEmployee.bind(this);
        this.employeeTabClick = this.employeeTabClick.bind(this);
    }

    componentWillMount = () => {
        var currentTabLocationHash = browserHistory.getCurrentLocation().hash;
        var lastSlashIndex = currentTabLocationHash.lastIndexOf('/');
        var currentTabLocation = currentTabLocationHash.substring(lastSlashIndex  + 1);
        (currentTabLocation == 'employee') ? currentTabLocation = 'details' : currentTabLocation;
        this.props.handleStateChanged('currentTabLocation', currentTabLocation);
    }

    updateButtonClick = () => {
        this.props.handleStateChanged('viewMode', true);
        this.props.handleStateChanged('selectedIndex', null);
        this.props.updateCurrentEmployee(this.props.editedEmployee);
    }

    editButtonClick = () => {
        this.props.handleStateChanged('viewMode', false);
    }

    deleteButtonClick = () => {
        this.props.handleStateChanged('viewMode', true);
        this.props.deleteCurrentEmployee(this.props.editedEmployee);
    }

    cancelButtonClick = () => {
        this.props.handleStateChanged('viewMode', true);
        this.setSavedEmployee(this.props.currentEmployee);
    }

    setSavedEmployee = (employee) => {
        this.props.handleStateChanged('editedEmployee', employee);
    }

    employeeTabClick = (e) => {
        this.props.handleStateChanged('currentTabLocation', e.props.value);
        browserHistory.push('#/employee/' + e.props.value);
    }

    render = () => {
        return (
            <div className="menu-tab">
                <Tabs value={this.props.currentTabLocation}>
                    <Tab icon={<ActionAccountBox />} value="details" onActive={this.employeeTabClick}>
                        <EmployeeTabDetails
                            currentEmployee={this.props.editedEmployee}
                            pageMode ={'EDIT'}
                            viewMode = {this.props.viewMode}/>
                    </Tab>
                    <Tab icon={<ActionHistory />} value="history" onActive={this.employeeTabClick}>
                        <EmployeeTabHistory
                            currentEmployee={this.props.editedEmployee}
                            pageMode ={'EDIT'}
                            viewMode = {this.props.viewMode}/>
                    </Tab>
                    <Tab icon={<MapsLayers />} value="grade" onActive={this.employeeTabClick}>
                        <EmployeeTabGradeHistory
                            currentEmployee={this.props.editedEmployee}
                            pageMode ={'EDIT'}
                            viewMode={this.props.viewMode}/>
                    </Tab>
                    <Tab icon={<NotificationWc />} value="family" onActive={this.employeeTabClick}>
                        <EmployeeTabFamilyMember
                            currentEmployee={this.props.editedEmployee}
                            pageMode ={'EDIT'}
                            viewMode={this.props.viewMode}/>
                    </Tab>
                    <Tab icon={<ActionHome />} value="address" onActive={this.employeeTabClick}>
                        <EmployeeTabAddress
                            currentEmployee={this.props.editedEmployee}
                            pageMode ={'EDIT'}
                            viewMode={this.props.viewMode}/>
                    </Tab>
                    <Tab icon={<CommunicationLocationOn />} value="location" onActive={this.employeeTabClick}>
                        <EmployeeTabLocation
                            currentEmployee={this.props.editedEmployee}
                            pageMode ={'EDIT'}
                            viewMode={this.props.viewMode}/>
                    </Tab>

                </Tabs>
                <div className="footer-content">
                    { (this.props.viewMode) ? (
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