import React, {Component} from 'react';

import Avatar from 'material-ui/Avatar';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import ActionAccountBox from 'material-ui/svg-icons/action/account-box';

class EmployeeTabDetails extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            value: "M"
        }
        this.handleGenderChange = this.handleGenderChange.bind(this);
    }

    handleGenderChange(event, index, value){
        return  this.setState({value});
    }

    render(){
        return(
        <div className="menu-content">
            <div className="content">
                <input type="hidden" id="employeeId"/>
                <TextField
                    floatingLabelText="First Name"
                /><br />
                <TextField
                    floatingLabelText="Last Name"
                /><br />
                <SelectField
                    floatingLabelText="Gender"
                    value={this.state.value}
                    onChange={this.handleGenderChange}>
                    <MenuItem value={"M"} primaryText="Male" />
                    <MenuItem value={"F"} primaryText="Female" />
                </SelectField><br />
                <DatePicker
                    floatingLabelText="Date of Birth"
                />
                <TextField
                    floatingLabelText="Nationality"
                /><br />
                <SelectField
                    floatingLabelText="Marital Status">
                    <MenuItem value={"S"} primaryText="Single" />
                    <MenuItem value={"M"} primaryText="Married" />
                </SelectField><br />
                <TextField
                    floatingLabelText="Phone"
                /><br />
            </div>
            <div className="content">
                <TextField
                    floatingLabelText="Sub Division"
                /><br />
                <SelectField
                    floatingLabelText="Status" >
                    <MenuItem value={"C"} primaryText="Contract" />
                    <MenuItem value={"P"} primaryText="Permanent" />
                </SelectField><br />
                <DatePicker
                    floatingLabelText="Suspend Date"
                />
                <DatePicker
                    floatingLabelText="Hire Date"
                />
                <SelectField
                    floatingLabelText="Grade">
                </SelectField><br />
                <SelectField
                    floatingLabelText="Division">
                </SelectField><br />
                <TextField
                    floatingLabelText="Email"
                /><br />
            </div>
            <div className="content">
                <Avatar

                  size={100}
                />
            </div>
        </div>
        )
    }
}

export default EmployeeTabDetails;