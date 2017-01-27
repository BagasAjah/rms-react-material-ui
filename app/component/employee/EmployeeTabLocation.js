import React, {Component} from 'react';
import update from 'react-addons-update';

import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {List} from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

import ContentAdd from 'material-ui/svg-icons/content/add';

import EmployeeLocationDetail from "./EmployeeLocationDetail"
import lookupData from "../../dummy_data/lookupData"

const validationErrorMessage = "This field is required!";

class EmployeeTabLocation extends Component {
    constructor(props) {
        super(props);
        this.state={
            officeStartDate:new Object,
            officeEndDate:new Object,
            officeLocation:'',
            officeAddress:'',
            selectedIndex: null,
            openDialog: false,
            lookupLocation: lookupData.location,
            openValidationMessage: false
        }
        this.handleStartDateChanged = this.handleStartDateChanged.bind(this);
        this.handleEndDateChanged = this.handleEndDateChanged.bind(this);
        this.handleOfficeLocationChanged = this.handleOfficeLocationChanged.bind(this);
        this.handleOfficeAddressChanged = this.handleOfficeAddressChanged.bind(this);
        this.handleStateDataChange = this.handleStateDataChange.bind(this);
        this.addOfficeLocationClick = this.addOfficeLocationClick.bind(this);
        this.openDialogClick = this.openDialogClick.bind(this);
        this.closeDialogClick = this.closeDialogClick.bind(this);
        this.handleDataChange = this.handleDataChange.bind(this);
        this.updateClick = this.updateClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({selectedIndex: null});
    }

    handleDataChange(index, value, type){
        var updatedEmployee = update(this.props.currentEmployee, {
            'location': {
                [index]: {
                    [type]: {$set: value}
                }
            }
        });
        this.props.setSavedEmployee(updatedEmployee);
    }

    handleStartDateChanged(e, value){
        this.handleStateDataChange('officeStartDate', value);
    }

    handleEndDateChanged(e, value){
        this.handleStateDataChange('officeEndDate', value);
    }

    handleOfficeLocationChanged(e, index, value){
        this.handleStateDataChange('officeLocation', value);
    }

    handleOfficeAddressChanged(e, value){
        this.handleStateDataChange('officeAddress', value);
    }

    handleStateDataChange(type, value){
        this.setState({[type]: value});
    }

    openDialogClick(){
        this.setState({
            openDialog: true,
            officeStartDate:null,
            officeEndDate: new Object,
            officeLocation:'',
            officeAddress:'',
            openValidationMessage: false
        });
    }

    closeDialogClick(){
        this.setState({openDialog: false});
    }

    addOfficeLocationClick(){
        if(this.state.officeAddress == '' || this.state.officeLocation =='' || this.state.officeStartDate == null) {
            this.setState({openValidationMessage: true});
        } else {
            var currentEmployee = this.props.currentEmployee;
            var updatedEmployee = update(currentEmployee, {'location': {
                $push: [{
                    officeStartDate: this.state.officeStartDate,
                    officeEndDate: this.state.officeEndDate,
                    officeLocation: this.state.officeLocation,
                    officeAddress: this.state.officeAddress
                }]
            }});
            this.props.setSavedEmployee(updatedEmployee);
            this.closeDialogClick();
        }
    }

    updateClick(index){
        this.setState({selectedIndex: index});
    }

    deleteClick(index){
        var updatedEmployee = update(this.props.currentEmployee, {'location': {$splice: [[index,1]]}});
        this.props.setSavedEmployee(updatedEmployee);
    }

    render() {
        const actionsButton = [
            <FlatButton
                label="Add"
                primary={true}
                onTouchTap={this.addOfficeLocationClick}
            />
        ];
        var locationList = this.props.currentEmployee.location;
        var lookupLocationMenuItem = this.state.lookupLocation.map(lookupLocation =>
            <MenuItem key= {lookupLocation.lookupCode} value={lookupLocation.lookupCode} primaryText={lookupLocation.lookupValue} />
        );
        var employeeLocationDetail = locationList.map((locationList, locationIndex) => (
            <EmployeeLocationDetail
                key={locationIndex}
                index={locationIndex}
                location={locationList}
                viewMode={this.props.viewMode}
                selectedIndex={this.state.selectedIndex}
                handleDataChange={this.handleDataChange.bind(this)}
                deleteClick={this.deleteClick.bind(this)}
                updateClick={this.updateClick.bind(this)}/>
        ));
        return (
            <div className="menu-content">
                <h2>Employee Location Details</h2>
                {(employeeLocationDetail.length == 0) ?
                    <div style={{textAlign: 'center'}}>Location Details Not Found</div>
                :
                    (<List >
                            {employeeLocationDetail}
                    </List>)
                }
                <FloatingActionButton className="btn-add-tab-position"
                    secondary={true}
                    onClick={this.openDialogClick}
                    disabled={this.props.viewMode}>
                    <ContentAdd />
                </FloatingActionButton>
                <Dialog
                    contentStyle={{width: '70%',maxWidth: 'none'}}
                    title="Office Location Details"
                    actions={actionsButton}
                    modal={false}
                    open={this.state.openDialog}
                    onRequestClose={this.closeDialogClick}>
                        <DatePicker
                            className='location-detail-dialog'
                            floatingLabelText="Office Start Date"
                            name="Office Start Date"
                            ref="a"
                            value={this.state.officeStartDate}
                            errorText={this.state.openValidationMessage && (this.state.officeStartDate==null)?validationErrorMessage:""}
                            onChange={(e, value) => this.handleStartDateChanged(e, value)}
                            autoOk={true} />
                        <DatePicker
                            className='location-detail-dialog'
                            floatingLabelText="Office End Date"
                            value={this.state.officeEndDate}
                            onChange={(e, value) => this.handleEndDateChanged(e, value)}
                            autoOk={true} />
                        <br />
                        <SelectField
                            className='location-detail-dialog'
                            floatingLabelText="Office Location"
                            maxHeight={200}
                            value={this.state.officeLocation}
                            errorText={this.state.openValidationMessage && (this.state.officeLocation=='')?validationErrorMessage:""}
                            onChange={(e, index, value) => this.handleOfficeLocationChanged(e, index, value)}>
                            {lookupLocationMenuItem}
                        </SelectField>
                        <TextField
                            className='location-detail-dialog'
                            floatingLabelText="Office Address"
                            value={this.state.officeAddress}
                            errorText={this.state.openValidationMessage && (this.state.officeAddress=='')?validationErrorMessage:""}
                            onChange={(e, value) => this.handleOfficeAddressChanged(e, value)}
                            multiLine={true}
                            rows={2}
                            rowsMax={2}
                            underlineShow={false}/>
                </Dialog>
            </div>
        )
    }
}

export default EmployeeTabLocation;
