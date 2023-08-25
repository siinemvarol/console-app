import PageLayout from "../../components/PageLayout";
import { Table } from "antd";
import AddTaskModal from "../../components/AddTaskModal";
import { useEffect, useState } from "react";
import axios from "axios";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
];

const Task = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const onOkAddTask = (values) => {
    setIsModalOpen(false);
//    console.log(values);
    axios.post("http://localhost:5000/task", values).then((response) => {
      console.log(response.data);
      setTasks((prevState) => [...prevState, response.data]);
    })
  };

  const onCancelAddTask = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/task").then((res) => {
      setTasks(res.data);
    })
  }, []);

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
      <Table dataSource={tasks} columns={columns} rowKey="id"/>
      <AddTaskModal
        isModalOpen={isModalOpen}
        onOk={onOkAddTask}
        onCancel={onCancelAddTask}
      />
    </PageLayout>
  );
};

export default Task;
