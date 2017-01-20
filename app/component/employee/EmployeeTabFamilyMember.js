import React, {Component} from 'react';
import update from 'react-addons-update';

import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MenuItem from 'material-ui/MenuItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';

import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentUpdate from 'material-ui/svg-icons/content/create';

import {grey500} from 'material-ui/styles/colors';

import lookupData from "../../dummy_data/lookupData"

const style = {
    headerStyle:{
        font: "bold"
    }
}

const validationErrorMessage = "This field is required!";

class EmployeeTabFamilyMember extends Component {

    constructor(props) {
        super(props);
        this.state = {
            familyName: '',
            familyGender: '',
            familyDob: new Object,
            familyType: '',
            isActive: false,
            selectedIndex: null,
            showCheckboxes: false,
            lookupGender: lookupData.gender,
            lookupType: lookupData.familyType,
            openValidationMessage: false
        }
        this.handleFamilyNameChanged = this.handleFamilyNameChanged.bind(this);
        this.handleFamilyGenderChanged = this.handleFamilyGenderChanged.bind(this);
        this.handleFamilyDobChanged = this.handleFamilyDobChanged.bind(this);
        this.handleFamilyTypeChanged = this.handleFamilyTypeChanged.bind(this);
        this.handleFamilyIsActiveChanged = this.handleFamilyIsActiveChanged.bind(this);
        this.addFamilyMemberClick = this.addFamilyMemberClick.bind(this);
    }

    handleFamilyNameChanged(e, value, familyIndex){
        var updatedEmployee = update(this.props.currentEmployee, {
            'familyMember': {
                [familyIndex]: {
                    'familyName': {$set: value}
                }
            }
        });
        this.props.setSavedEmployee(updatedEmployee);
    }

    handleFamilyGenderChanged(e, index, value, familyIndex){
        var updatedEmployee = update(this.props.currentEmployee, {
            'familyMember': {
                [familyIndex]: {
                    'familyGender': {$set: value}
                }
            }
        });
        this.props.setSavedEmployee(updatedEmployee);
    }

    handleFamilyDobChanged(e, value, familyIndex){
        var updatedEmployee = update(this.props.currentEmployee, {
            'familyMember': {
                [familyIndex]: {
                    'familyDob': {$set: value}
                }
            }
        });
        this.props.setSavedEmployee(updatedEmployee);
    }

    handleFamilyTypeChanged(e, index, value, familyIndex){
        var updatedEmployee = update(this.props.currentEmployee, {
            'familyMember': {
                [familyIndex]: {
                    'familyType': {$set: value}
                }
            }
        });
        this.props.setSavedEmployee(updatedEmployee);
    }

    handleFamilyIsActiveChanged(e, isInputChecked, familyIndex){
        var updatedEmployee = update(this.props.currentEmployee, {
            'familyMember': {
                [familyIndex]: {
                    'isActive': {$set: isInputChecked}
                }
            }
        });
        this.props.setSavedEmployee(updatedEmployee);
    }

    addFamilyMemberClick(){
        var currentEmployee = this.props.currentEmployee;
        var updatedEmployee = update(currentEmployee, {
            familyMember: {
                $push: [{
                    familyName: '',
                    familyGender: '',
                    familyDob: new Object,
                    familyType: '',
                    isActive: false
                }]
            }
        });
        this.props.setSavedEmployee(updatedEmployee);
    }

    updateClick(index){
        if(!this.props.viewMode){
            this.setState({selectedIndex: index});
        }
    }

    deleteClick(index){
        if(!this.props.viewMode){
            var updatedEmployee = update(this.props.currentEmployee, {'familyMember': {$splice: [[index,1]]}});
            this.props.setSavedEmployee(updatedEmployee);
        }
    }

    render(){
        const noDataFound = [
            <TableRow key='not-found'>
                <TableRowColumn style={{textAlign: 'center'}}>
                    <TextField
                        id="not-found-field"
                        value={"No Family Member Found"}
                        disabled={true}
                        underlineShow={false}/>
                </TableRowColumn>
            </TableRow>
        ];
        var lookupGenderMenuItem = this.state.lookupGender.map(lookupGender =>
            <MenuItem key= {lookupGender.lookupCode} value={lookupGender.lookupCode} primaryText={lookupGender.lookupValue} />
        );
        var lookupTypeMenuItem = this.state.lookupType.map(lookupType =>
            <MenuItem key= {lookupType.lookupCode} value={lookupType.lookupCode} primaryText={lookupType.lookupValue} />
        );
        var familyMember = this.props.currentEmployee.familyMember;
        var familyMemberListDetail = familyMember.map( (familyMember, familyIndex) =>
            (<TableRow key={familyIndex}>
                <TableRowColumn width={"25%"}>
                    <TextField
                        id={"family-name-"+familyMember.familyId}
                        value={familyMember.familyName}
                        disabled={familyIndex==this.state.selectedIndex?false:true}
                        onChange={(event, value) =>  this.handleFamilyNameChanged(event, value, familyIndex)}
                        underlineShow={false}/>
                </TableRowColumn>
                <TableRowColumn width={"10%"}>
                    <SelectField
                        id={"family-gender-"+familyMember.familyId}
                        maxHeight={200}
                        value={familyMember.familyGender}
                        disabled={familyIndex==this.state.selectedIndex?false:true}
                        onChange={(event, index, value) =>  this.handleFamilyGenderChanged(event, index, value, familyIndex)}
                        underlineShow={false}>
                        {lookupGenderMenuItem}
                    </SelectField>
                </TableRowColumn>
                <TableRowColumn width={"25%"}>
                    <DatePicker
                        id={"family-dob-"+familyMember.familyId}
                        value={familyMember.familyDob}
                        autoOk={true}
                        disabled={familyIndex==this.state.selectedIndex?false:true}
                        onChange={(event, value) =>  this.handleFamilyDobChanged(event, value, familyIndex)}
                        underlineShow={false}
                    />
                </TableRowColumn>
                <TableRowColumn width={"15%"}>
                    <SelectField
                        id={"family-type-"+familyMember.familyId}
                        maxHeight={200}
                        value={familyMember.familyType}
                        disabled={familyIndex==this.state.selectedIndex?false:true}
                        onChange={(event, index, value) =>  this.handleFamilyTypeChanged(event, index, value, familyIndex)}
                        underlineShow={false}>
                        {lookupTypeMenuItem}
                    </SelectField>
                </TableRowColumn>
                <TableRowColumn width={"5%"}>
                    <Checkbox
                        label="Simple"
                        checked={familyMember.isActive}
                        onCheck={(event, isInputChecked) =>  this.handleFamilyIsActiveChanged(event, isInputChecked, familyIndex)}
                        disabled={familyIndex==this.state.selectedIndex?false:true}/>
                </TableRowColumn>
                <TableRowColumn width={"20%"}>
                    <ContentUpdate className='pen-icon-margin' color={grey500} onClick={this.updateClick.bind(this, familyIndex)}/>
                    <ActionDelete color={grey500} onClick={this.deleteClick.bind(this, familyIndex)}/>
                </TableRowColumn>
            </TableRow>)
        );
        return(
            <div className="menu-content">
                <h2>Employee Family Member</h2>
                <Table selectable={false}>
                    <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>
                        <TableRow>
                            <TableHeaderColumn width={"25%"}>Name</TableHeaderColumn>
                            <TableHeaderColumn width={"10%"}>Gender</TableHeaderColumn>
                            <TableHeaderColumn width={"25%"}>DOB</TableHeaderColumn>
                            <TableHeaderColumn width={"15%"}>Type</TableHeaderColumn>
                            <TableHeaderColumn width={"5%"}>Active</TableHeaderColumn>
                            <TableHeaderColumn width={"20%"}></TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                        {(familyMemberListDetail.length == 0) ?
                            (noDataFound) : (familyMemberListDetail)}
                    </TableBody>
                </Table>
                <FloatingActionButton className="btn-add-tab-position"
                    backgroundColor={grey500}
                    onClick={this.addFamilyMemberClick}
                    disabled={this.props.viewMode}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        )
    }
}

export default EmployeeTabFamilyMember;