import PageLayout from "../../components/PageLayout";
import { Table } from "antd";
import AddTaskModal from "../../components/AddTaskModal";
import { useState } from "react";

const dataSource = [
    {
      key: "1",
      name: "Update",
    },
    {
      key: "2",
      name: "Deploy",
    },
  ];
  
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];

const Task = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const onOkAddTask = (values) => {
        setIsModalOpen(false);
        console.log(values);
    }

    const onCancelAddTask = () => {
        setIsModalOpen(false);
    }

    const buttons = [
        {
          key: "addTask",
          text: "Add Task",
          type: "primary",
          onClick: () => setIsModalOpen(true),
        },
      ];

    return (
        <PageLayout buttons={buttons}>
        <Table dataSource={dataSource} columns={columns} />
        <AddTaskModal isModalOpen={isModalOpen} onOk={onOkAddTask} onCancel={onCancelAddTask} />
      </PageLayout>
    )
}

export default Task;