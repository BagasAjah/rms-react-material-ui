import React, {Component} from 'react';
import {Tab} from 'material-ui/Tabs';

import ActionHistory from 'material-ui/svg-icons/action/history';

class EmployeeTabHistory extends Component {
    constructor(props) {
        super(props);
        this.props = {
            value: 'details'
        };
    }

    render(){
        return(
            <Tab icon={<ActionHistory />} value={this.props.value}>
                {this.props.children}
            </Tab>
        )
    }
}

export default EmployeeTabHistory;