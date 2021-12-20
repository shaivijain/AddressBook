import React, {Component} from 'react';
import {Row,Col, Button,Input, Modal} from 'antd'
import ContactListComponent from '@components/ContactListComponent';
import makeRequest from "@Utils/makeRequest";
import AddContactForm from '@components/AddContactForm';
import { connect } from "react-redux";
import moment from 'moment'

class ContactContainer extends Component{
    constructor(props){
        super(props);
        this.state={
            addessData:[],
            addContactModal:false,
            rowData:{},
            edit:false
        }
    }
    openContactModal=(value)=>{
        this.setState({addContactModal:value,edit:false,initialValues:{}})
    }
    fetchAddress=()=>{
        makeRequest.get("Address") .then((response) => {
            if(response){
                this.setState({addessData:response})
            }
         })
    }
    componentDidMount(){
       this.fetchAddress()
    }
    getEditData=(data)=>{
        let initialValues={First_Name:data.First_Name,Last_Name:data.Last_Name,Birthday:data.Birthday?data.Birthday:"",Description:data.Description?data.Description:"",Emails:data.Emails?data.Emails:"",Mobile:data.Phones[0].Phone_Number,Home:data?.Phones[1]?.Phone_Number}
        this.setState({rowData:data,edit:true,initialValues},()=>{
            this.setState({addContactModal:true})
        })
    }
    deleteRow=(data)=>{
        makeRequest.delete(`Address/${data?.id}/`) .then((response) => {
            this.fetchAddress()
         })
    }
    SaveFormData=(values,rowData)=>{
        var utcMoment = moment.utc();
        let data = {
            "id":this.state.edit?rowData?.id:this.state.addessData.length+1,
            "First_Name":values.First_Name,
            "Last_Name": values.Last_Name,
            "Birthday": values.Birthday?values.Birthday:"",
            "Description": values.Description?values.Description:"",
            "Emails": values.Emails?values.Emails:"",
            "Phones": [{
              "Type": "Mobile",
              "Phone_Number":values.Mobile
              }, {
              "Type": "Home",
              "Phone_Number": values.Home?values.Home:""
              }
            ],
            "OwnerId": this.state.edit?rowData?.OwnerId:this.props.userData.id,
            "CreatedDate": this.state.edit?rowData?.CreatedDate:new Date( utcMoment.format() ),
            "UpdatedDate":  !this.state.edit?rowData?.UpdatedDate:new Date( utcMoment.format() )
          }
          if(this.state.edit){
            makeRequest.put(`Address/${rowData?.id}/`,data).then((response) => {
                if(response && Object.values(response).length){
                    this.fetchAddress()
                }
             })  
          }else{
            makeRequest.post("Address",data).then((response) => {
                if(response && Object.values(response).length){
                    this.fetchAddress()
                }
             })
          }   
          this.setState({addContactModal:false})   
    }
    onEnter=(e)=>{
        if(e.key=="Enter"){
            makeRequest.get(`Address?q=${e.target.value}`).then((response) => {
                if(response){
                    this.setState({addessData:response})
                }
             })
        }
    }
    render(){
        return <Row className="contactContainer">
            <Col span={24} className="header">
                <Col span={4} className="headerLeft">Contacts</Col>
                <Col span={20} className="headerRight">
                    <Col span={20}><Input placeholder="Type text and enter to Search" onKeyDown={(e)=>{this.onEnter(e)}} className="search" /></Col>
                    <Col span={4}><Button className="AddButton" onClick={()=>this.openContactModal(true)} >Add Contact</Button></Col></Col>
            </Col>
            <Col span={24}><ContactListComponent addessData={this.state.addessData} getEditData={this.getEditData} deleteRow={this.deleteRow} /></Col>
            {this.state.addContactModal?<Modal title={!this.state.edit?"Create A New Contact":"Update Contact"} footer={null} visible={true} onCancel={()=>this.openContactModal(false)} ><AddContactForm RowData={this.state.rowData} edit={this.state.edit} initialValues={this.state.initialValues} SaveFormData={this.SaveFormData} /></Modal>:null}
        </Row>
    }
}
const mapStateToProps = (state) => ({
    userData: state.LoggedInUserData.loggednUserData,
  });
  
export default connect(mapStateToProps)(ContactContainer);