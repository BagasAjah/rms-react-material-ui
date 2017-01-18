import React, {Component} from 'react';
import update from 'react-addons-update';
import {Tabs, Tab} from 'material-ui/Tabs';
import {ToolbarGroup} from 'material-ui/Toolbar';

import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import ActionHistory from 'material-ui/svg-icons/action/history';
import ActionHome from 'material-ui/svg-icons/action/home';
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';
import MapsLayers from 'material-ui/svg-icons/maps/layers';
import RaisedButton from 'material-ui/RaisedButton';
import NotificationWc from 'material-ui/svg-icons/notification/wc';

import EmployeeTabDetails from "./EmployeeTabDetails"

class EmployeeTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            viewMode: true,
            employee: this.props.currentEmployee
        };
        this.editButtonClick = this.editButtonClick.bind(this);
        this.cancelButtonClick = this.cancelButtonClick.bind(this);
        this.setSavedEmployee = this.setSavedEmployee.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({employee: nextProps.currentEmployee});
    }

    editButtonClick(){
        this.setState({viewMode: false});
        this.setSavedEmployee(this.props.currentEmployee);
    }

    cancelButtonClick(){
        this.setState({viewMode: true});
        this.setSavedEmployee({});
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
                            Test history
                        </div>
                    </Tab>
                    <Tab icon={<MapsLayers />} value="grade">
                        {this.props.children}
                        <div className="menu-content">
                            Test grade
                        </div>
                    </Tab>
                    <Tab icon={<NotificationWc />} value="family">
                        {this.props.children}
                        <div className="menu-content">
                            Test family
                        </div>
                    </Tab>
                    <Tab icon={<ActionHome />} value="address">
                        {this.props.children}
                        <div className="menu-content">
                            Test address
                        </div>
                    </Tab>
                    <Tab icon={<CommunicationLocationOn />} value="location">
                        {this.props.children}
                        <div className="menu-content">
                            Test location
                        </div>
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
                            />

                        </div> ):(
                        <div>
                            <RaisedButton
                                label={"Save"}
                                secondary={true}
                                className="footer-button"
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