import React, { Component } from "react";
import { Form, Input, Button } from "antd";
const {TextArea} = Input;

export default class AddContactForm extends Component {

    constructor(props){
        super(props);
        this.state={
            initialValues:{}
        }
    }
    onFinish = (values) => {
        this.props.SaveFormData(values,this.props.RowData)
    };

  render() {
    
    return (
        <div className="createContact">
            <Form
            name="createContact"
            className="createContactForm"
            initialValues={this.props.initialValues}
            onFinish={this.onFinish}
            >
                <Form.Item
                    name="First_Name"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your First Name!',
                    },
                    ]}
                >
                    <Input className="Input" placeholder="First Name" />
                </Form.Item>
                <Form.Item
                    name="Last_Name"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Last Name!',
                    },
                    ]}
                >
                    <Input
                     placeholder="Last Name"
                     className="Input"
                    />
                </Form.Item>
                <Form.Item
                    name="Mobile"
                    rules={[
                    {   
                        required: true,
                        message: 'Please input your Mobile Number!',
                    },
                    ]}
                >
                    <Input
                     placeholder="Mobile Contact Number"
                     className="input"
                    />
                </Form.Item>
                <Form.Item
                    name="Home"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Home Contact Number!',
                        },
                    ]}
                >
                     <Input
                     placeholder="Home Contact Number"
                     className="input"
                    />
                </Form.Item>
                <Form.Item
                    name="Birthday" 
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Birthday!',
                        },
                    ]}
                >
                    <Input
                     placeholder="Birthday"
                     className="Input"
                    />
                </Form.Item>
                <Form.Item
                    name="Description" 
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Description!',
                        },
                    ]}
                >
                    <TextArea
                     placeholder="Description"
                    />
                </Form.Item>
                <Form.Item
                    name="Emails"
                    rules={[
                    {   
                        required: true,
                        message: 'Please input your Email!',
                    },
                    ]}
                >
                    <Input
                     placeholder="Email"
                     className="input"
                    />
                </Form.Item>
                <Form.Item className="ButtonSubmit">
                    <Button type="primary" htmlType="submit" className="savebutton">
                    {!this.props.edit?"Save":"Update"}
                    </Button>
                </Form.Item>
            </Form>
    </div>
    );
  }
}
