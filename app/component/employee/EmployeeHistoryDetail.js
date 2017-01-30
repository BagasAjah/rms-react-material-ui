import React, {Component} from 'react';
import moment from 'moment';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';

import ActionAdd from 'material-ui/svg-icons/content/add-circle';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentUpdate from 'material-ui/svg-icons/content/create';
import ListIcon from 'material-ui/svg-icons/toggle/radio-button-checked';

import {indigo900} from 'material-ui/styles/colors';

class EmployeeHistoryDetail extends Component {
    constructor(props) {
        super(props);
        this.handleJobDescChanged = this.handleJobDescChanged.bind(this);
        this.addNewJobDesc = this.addNewJobDesc.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
    }

    updateClick(jobDescIndex){
        this.props.updateClick(this.props.index, jobDescIndex);
    }

    deleteJobDescClick(jobDescIndex){
        this.props.deleteClick(this.props.index, jobDescIndex);
    }

    deleteClick(){
        this.props.deleteClick(this.props.index, null);
    }

    handleJobDescChanged(jobDescValue, jobDescIndex){
        this.props.handleJobDescChanged(this.props.index, jobDescIndex, jobDescValue);
    }

    addNewJobDesc(){
        this.props.addNewJobDesc(this.props.index);
    }

    render(){
        var history = this.props.history;
        var jobDesc = history.jobDesc;
        var historyStartMonth = moment(history.historyStartDate).format("MMMM").toString();
        var historyStartYear = moment(history.historyStartDate).format("YYYY").toString();
        var historyEndMonth = moment(history.historyEndDate).format("MMMM").toString();
        var historyEndYear = moment(history.historyEndDate).format("YYYY").toString();
        var jobDesc = jobDesc.map((jobDesc, jobDescIndex) => (
            <div key={jobDescIndex} style={{width:'100%',clear:"both", paddingTop:10}}>
                <div style={{float: "left",paddingRight: 20}}><ListIcon/></div>
                {(this.props.index==this.props.selectedIndex && jobDescIndex==this.props.selectedJobDescIndex) ?
                    <TextField
                        id={"history-jobDesc-" + this.props.index + "-" + jobDescIndex}
                        style={{float: "left",paddingRight: 20}}
                        value={jobDesc}
                        underlineShow={true}
                        onChange={(e, jobDescValue) => this.handleJobDescChanged(jobDescValue, jobDescIndex)}/> :
                    <div style={{width:256, height:48, float: "left",paddingRight: 20}}>{jobDesc}</div>
                }
                {(!this.props.viewMode) ?
                    (<span>
                        <ContentUpdate
                            style={{float: "left",paddingRight: 5}}
                            ref={jobDescIndex}
                            onClick={this.updateClick.bind(this,jobDescIndex)}/>
                        <ActionDelete
                            style={{float: "left"}}
                            ref={jobDescIndex}
                            onClick={this.deleteJobDescClick.bind(this,jobDescIndex)}/>
                    </span>) : ''
                }
            </div>
        ));
        return(
            <div className="detail-content">
                <div className="detail-content-left">
                    {(!this.props.viewMode) ? <ActionDelete style={{float: "left"}} onClick={this.deleteClick}/> : ''}
                    <div style={{color: indigo900}}>
                        <span style={{marginLeft:30}}>{historyStartMonth}</span>
                        <span style={{marginRight:30, float: "right"}}>{historyEndMonth}</span>
                    </div>
                    <div style={{fontSize:'150%', color: indigo900}}><b>
                        <span style={{marginLeft:30}}>{historyStartYear}</span>
                        <span style={{marginLeft:75}}> - </span>
                        <span style={{marginRight:40, float: "right"}}>{historyEndYear}</span></b>
                    </div>
                    <div className="detail-content-border-right" /><br/>
                    <div className='detail-content-pull-right' style={{color: indigo900}}>
                        <div style={{fontSize:'120%', color: indigo900}}><b>{history.company}</b></div>
                        <br /><br />
                        <div>{history.position}</div>
                    </div>
                </div>
                <div className="detail-content-divider-vertical"/>
                <div className="detail-content-right">
                    <div style={{width:'100%'}}>
                        <div style={{float:"left", paddingRight:20, paddingBottom:10, fontSize:'110%'}}>Job Description</div>
                        <div style={{float:"left"}}>
                            {(!this.props.viewMode) ? <ActionAdd onClick={this.addNewJobDesc}/> : ''}
                        </div>
                    </div>
                    <div>
                        {jobDesc}
                    </div>
                </div>
            </div>
        )
    }
}

export default EmployeeHistoryDetail;