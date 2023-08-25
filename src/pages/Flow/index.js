import PageLayout from "../../components/PageLayout";
import { Table, Tag } from "antd";
import AddFlowModal from "../../components/AddFlowModal";
import { useEffect, useState } from "react";
import axios from "axios";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Tasks",
    dataIndex: "tasks",
    key: "tasks",
    render: (cell, row) => {
      return cell.map((item) => (
        <Tag color="green" key={item.id}>
          {item.name}
        </Tag>
      ));
    },
  },
];

const Flow = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [flows, setFlows] = useState([]);

  const buttons = [
    {
      key: "addFlow",
      text: "Add Flow",
      type: "primary",
      onClick: () => setIsModalOpen(true),
    },
  ];

  const onOkAddFlow = (values) => {
    setIsModalOpen(false);
    console.log(values);
    const newFlow = {
      name: values.name,
      tasks: values.tasks.join(","),
    };
    axios.post("http://localhost:5000/flow", newFlow).then((res) => {
      setFlows((prevState) => [
        ...prevState,
        {
          ...res.data,
          tasks: values.tasks.map(
            (tId) => tasks.filter((t) => t.id === parseInt(tId))[0]
          ),
        },
      ]);
    });
  };

  const onCancelAddFlow = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/task").then((res) => {
      setTasks(res.data);
      axios.get("http://localhost:5000/flow").then((resFlow) => {
        const flowsData = resFlow.data.map((flow) => {
          return {
            ...flow,
            tasks: flow.tasks.split(",").map((tId) => {
              return res.data.filter((t) => t.id === parseInt(tId))[0];
            }),
          };
        });
        setFlows(flowsData);
      });
    });
  }, []);

  return (
    <PageLayout buttons={buttons}>
      <Table dataSource={flows} columns={columns} rowKey="id"/>
      <AddFlowModal
        isModalOpen={isModalOpen}
        onOk={onOkAddFlow}
        onCancel={onCancelAddFlow}
        tasks={tasks}
      />
    </PageLayout>
  );
};

export default Flow;
