import React, {Component} from 'react';

import Avatar from 'material-ui/Avatar';
import {ListItem} from 'material-ui/List';
import {indigo400} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';

import ToogleRadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';

import moment from 'moment'

import {partial} from "../lib/utils"


class EmployeeListDetail extends Component {
    constructor(props){
        super(props);
    }


    render = () => {
        var employee = this.props.employee;
        const employeeClick = partial(this.props.setCurrentEmployee, employee);
        var hireDateStr = moment(this.props.employee.hireDate).format("DD MMM YYYY").toString();
        return(
            <Paper key={this.props.index} className="employee-list-container" zDepth={1}>
                <ListItem
                    primaryText={
                        <span>
                            <b>{employee.firstName} {employee.lastName}</b>
                            <span className="paper-pull-right">{hireDateStr}</span>
                        </span>
                    }
                    secondaryText={
                        <p>
                            {employee.grade}, {employee.division} <br />
                            {employee.office}, {employee.phone}
                        </p>
                    }
                    rightIcon={
                        <ToogleRadioButtonChecked className="toggle-radio-button-position" color={indigo400}/>

                    }
                    secondaryTextLines={2}
                    leftAvatar={<Avatar>A</Avatar>}
                    onClick={employeeClick}/>
            </Paper>
        )
    }

}

export default EmployeeListDetail;