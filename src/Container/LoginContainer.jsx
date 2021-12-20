import React, { Component } from "react";
import LoginComponent from "@components/LoginComponent";
import makeRequest from "../Utils/makeRequest";
import { message } from "antd";
import { LOGGED_IN_USER_DATA } from "@actions";
import { connect } from "react-redux";

class LoginContainer extends Component {
  loginEvent = (values) => {
    makeRequest.getUsers("Users",values) .then((event) => {
       if(Object.values(event).length){
         this.props.setAccessToken(event)
        this.props.history.push({ pathname: "/contacts"})
       }else{
           message.error("Invalid Credentials")
       }
    })
  };
  render() {
    return  <div className="LoginContainer">
          <LoginComponent loginEvent={this.loginEvent} />
        </div>
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setAccessToken: (value) => dispatch({ type: LOGGED_IN_USER_DATA, payLoad: value }),
  };
};
export default connect(null, mapDispatchToProps)(LoginContainer);
