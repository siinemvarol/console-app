import AddPermissionModal from "../../components/AddPermissionModal";
import PageLayout from "../../components/PageLayout";
import { Table, Button } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { EditOutlined } from "@ant-design/icons";

const Permission = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [initialValues, setInitialValues] = useState();

  const onOkAddPermission = (values) => {
    setIsModalOpen(false);
    //       console.log(values);
    if (initialValues) {
      axios
        .put(`http://localhost:5000/permission/${initialValues.id}`, values)
        .then((res) => {
          setPermissions((prevState) => {
            return prevState.map((p) => {
              if (res.data.id === p.id) {
                return res.data;
              }
              return p;
            });
          });
        });
    } else {
      axios
        .post("http://localhost:5000/permission", values)
        .then((response) => {
          //    console.log(response.data);
          setPermissions((prevState) => [...prevState, response.data]);
        });
    }
  };

  const onCancelAddPermission = () => {
    setIsModalOpen(false);
  };

  const buttons = [
    {
      key: "addPermission",
      text: "Add Permission",
      type: "primary",
      onClick: () => {
        setIsModalOpen(true);
        setInitialValues(null);
      },
    },
  ];

  const onClickEdit = (row) => {
    setIsModalOpen(true);
    setInitialValues(row);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
    axios.get("http://localhost:5000/permission").then((res) => {
      setPermissions(res.data);
    });
  }, []);

  return (
    <PageLayout buttons={buttons}>
      <Table dataSource={permissions} columns={columns} rowKey="id" />
      {isModalOpen && (
        <AddPermissionModal
          isModalOpen={isModalOpen}
          onOk={onOkAddPermission}
          onCancel={onCancelAddPermission}
          initialValues={initialValues}
        />
      )}
    </PageLayout>
  );
};

export default Permission;
