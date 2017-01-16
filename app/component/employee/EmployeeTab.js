import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {ToolbarGroup} from 'material-ui/Toolbar';

import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import ActionHistory from 'material-ui/svg-icons/action/history';
import ActionHome from 'material-ui/svg-icons/action/home';
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on';
import MapsLayers from 'material-ui/svg-icons/maps/layers';
import NotificationWc from 'material-ui/svg-icons/notification/wc';

import EmployeeTabDetails from "./EmployeeTabDetails"

class EmployeeTab extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <Tabs
                    className="menu-tab">
                        <Tab icon={<ActionAccountBox />} value="details">
                            <EmployeeTabDetails currentEmployee={this.props.currentEmployee}/>
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
        )
    }
}

export default EmployeeTab;