import React from 'react';
import { Table, Space,Modal } from 'antd';
import {EditOutlined,DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons';

const { Column, ColumnGroup } = Table;
const confirm=(props,record)=>{
  Modal.confirm({
    title: 'Confirm',
    icon: <ExclamationCircleOutlined />,
    content: 'Do you want to delete this record?',
    okText: 'Yes',
    cancelText: 'No',
    onOk:()=>{props.deleteRow(record)}
  });
}

const ContactListComponent =(props)=>{
        return <Table dataSource={props.addessData} bordered >
                    <ColumnGroup title="Name">
                        <Column title="First Name" dataIndex="First_Name" key="firstName" />
                        <Column title="Last Name" dataIndex="Last_Name" key="lastName" />
                    </ColumnGroup>
                    <Column title="Birthday" dataIndex="Birthday" key="Birthday" />
                    <Column title="Emails" dataIndex="Emails" key="Emails" />
                    <ColumnGroup title="Phones">
                        <Column title="Mobile" dataIndex="Phones" key="Mobile" render={(text) => <span>{text[0].Phone_Number}</span>} />
                        <Column title="Home" dataIndex="Phones" key="Home"  render={(text) => <span>{text[1].Phone_Number}</span>} />
                    </ColumnGroup>
                    <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <Space size="middle">
                        <a href='blank' onClick={()=>{props.getEditData(record)}}><EditOutlined /></a>
                        <a href='blank' onClick={()=>{confirm(props,record)}}><DeleteOutlined /></a>
                        </Space>
                    )}
                    />
                </Table>
}
export default ContactListComponent