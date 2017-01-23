import React, {Component} from 'react';
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
import EmployeeTabLocation from "./EmployeeTabLocation"

class EmployeeTab extends Component {

    constructor(props) {
        super(props);
        this.props.currentEmployee.gradeHistory.sort();
        this.props.currentEmployee.gradeHistory.reverse();
        this.state = {
            viewMode: true,
            employee: this.props.currentEmployee
        };
        this.updateButtonClick = this.updateButtonClick.bind(this);
        this.editButtonClick = this.editButtonClick.bind(this);
        this.cancelButtonClick = this.cancelButtonClick.bind(this);
        this.deleteButtonClick = this.deleteButtonClick.bind(this);
        this.setSavedEmployee = this.setSavedEmployee.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({employee: nextProps.currentEmployee});
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

    render() {
        return (
            <div className="menu-tab">
                <Tabs>
                    <Tab icon={<ActionAccountBox />} value="details">
                        <EmployeeTabDetails
                            viewMode={this.state.viewMode}
                            currentEmployee={this.state.employee}
                            setSavedEmployee={this.setSavedEmployee.bind(this)}/>
                    </Tab>
                    <Tab icon={<ActionHistory />} value="history">
                        {this.props.children}
                        <div className="menu-content">
                            <h2>Employee History</h2>
                        </div>
                    </Tab>
                    <Tab icon={<MapsLayers />} value="grade">
                        <EmployeeTabGradeHistory
                            viewMode={this.state.viewMode}
                            currentEmployee={this.state.employee}
                            setSavedEmployee={this.setSavedEmployee.bind(this)}/>
                    </Tab>
                    <Tab icon={<NotificationWc />} value="family">
                        <EmployeeTabFamilyMember
                            viewMode={this.state.viewMode}
                            currentEmployee={this.state.employee}
                            setSavedEmployee={this.setSavedEmployee.bind(this)}/>
                    </Tab>
                    <Tab icon={<ActionHome />} value="address">
                        {this.props.children}
                        <div className="menu-content">
                            <h2>Employee Address Details</h2>
                        </div>
                    </Tab>
                    <Tab icon={<CommunicationLocationOn />} value="location">
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