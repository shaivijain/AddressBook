import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default class LoginComponent extends Component {

    onFinish = (values) => {
      this.props.loginEvent(values)
    };

  render() {
    
    return (
        <div className="login">
            <div className="LoginHeader"><h1 className="headerText">User Login</h1></div>
            <Form
            name="Login"
            className="loginform"
            initialValues={{
                remember: true,
            }}
            onFinish={this.onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} className="Input" placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                    ]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    className="Input"
                    />
                </Form.Item>

                <Form.Item className="SubmitWrapper">
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                    </Button>
                </Form.Item>
            </Form>
    </div>
    );
  }
}
