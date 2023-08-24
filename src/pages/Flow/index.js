import PageLayout from "../../components/PageLayout";
import { Table } from "antd";
import AddFlowModal from "../../components/AddFlowModal";
import { useState } from "react";

const dataSource = [
    {
        key: '1',
        name: 'Flow1',
        tasks: "Task3, Task4",
    },
    {
        key: '2',
        name: 'Flow2',
        tasks: "Task3, Task4",
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Tasks',
        dataIndex: 'tasks',
        key: 'tasks',
    },
];


const Flow = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const onOkAddFlow = (values) => {
        setIsModalOpen(false);
        console.log(values);
    }

    const onCancelAddFlow = () => {
        setIsModalOpen(false);
    }

    const buttons = [{ key: "addFlow", text: "Add Flow", type: "primary", onClick: () => setIsModalOpen(true) }]


    return (
        <PageLayout buttons={buttons}>
        <Table dataSource={dataSource} columns={columns} />
        <AddFlowModal isModalOpen={isModalOpen} onOk={onOkAddFlow} onCancel={onCancelAddFlow} />
        
      </PageLayout>
    )
}

export default Flow;