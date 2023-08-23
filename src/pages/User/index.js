import { useState } from "react";
import AddUserModal from "../../components/AddUserModal";
import PageLayout from "../../components/PageLayout";
import { Table } from "antd";

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];



const User = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const onOkAddModel = (values) => {
        setIsModalOpen(false);
        console.log(values);
    }

    const onCancelAddModel = () => {
        setIsModalOpen(false);
    }

    const buttons = [{ key: "addUser", text: "Add User", type: "primary", onClick: () => setIsModalOpen(true) }]

    return (
        <PageLayout buttons={buttons}>
            <Table dataSource={dataSource} columns={columns} />
            <AddUserModal isModalOpen={isModalOpen} onOk={onOkAddModel} onCancel={onCancelAddModel}/>
        </PageLayout>
    )
}

export default User;