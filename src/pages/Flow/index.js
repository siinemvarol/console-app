import PageLayout from "../../components/PageLayout";
import { Button, Table, Tag } from "antd";
import AddFlowModal from "../../components/AddFlowModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { EditOutlined } from "@ant-design/icons";

const Flow = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [flows, setFlows] = useState([]);
  const [initialValues, setInitialValues] = useState([]);
  const [search, setSearch] = useState("");

  const buttons = [
    {
      key: "addFlow",
      text: "Add Flow",
      type: "primary",
      onClick: () => {
        setIsModalOpen(true);
        setInitialValues(null);
      },
    },
  ];

  const onOkAddFlow = (values) => {
    setIsModalOpen(false);
    console.log(values);

    if (initialValues) {
      axios
        .put(`http://localhost:5000/flow/${initialValues.id}`, {
          ...values,
          tasks: values.tasks.join(","),
        })
        .then((res) => {
          setFlows((prevState) => {
            return prevState.map((f) => {
              if (res.data.id == f.id) {
                return {
                  ...res.data,
                  tasks: values.tasks.map((taskId) => {
                    return tasks.find((t) => t.id === taskId);
                  }),
                };
              }
              return f;
            });
          });
        });
    } else {
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
    }
  };

  const onCancelAddFlow = () => {
    setIsModalOpen(false);
  };

  const onClickEdit = (row) => {
    setIsModalOpen(true);
    const taskIds = row.tasks.map((task) => task.id);
    setInitialValues({ ...row, tasks: taskIds });
  };

  const onSearch = (value) => {
    setSearch(value);
  };

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
        console.log(cell);
        return cell.map((item) => (
          <Tag color="green" key={item.id}>
            {item.name}
          </Tag>
        ));
      },
    },
    {
      dataIndex: "id",
      key: "id",
      render: (cell, row) => {
        return (
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => onClickEdit(row)}
          />
        );
      },
      width: 50,
    },
  ];

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
    <PageLayout buttons={buttons} onSearch={onSearch}>
      <Table
        dataSource={flows.filter((flow) => {
          return flow.name.includes(search);
        })}
        columns={columns}
        rowKey="id"
      />
      {isModalOpen && (
        <AddFlowModal
          isModalOpen={isModalOpen}
          onOk={onOkAddFlow}
          onCancel={onCancelAddFlow}
          initialValues={initialValues}
          tasks={tasks}
        />
      )}
    </PageLayout>
  );
};

export default Flow;
