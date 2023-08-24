import { useEffect, useState } from "react";
import AddUserModal from "../../components/AddUserModal";
import PageLayout from "../../components/PageLayout";
import { Table } from "antd";
import axios from "axios";

const dataSource = [
  {
    key: "1",
    firstname: "Mike",
    lastname: "Mike",
    gender: "male",
    roles: "",
  },
  {
    key: "2",
    firstname: "John",
    lastname: "John",
    gender: "male",
    roles: "",
  },
];

const columns = [
  {
    title: "First Name",
    dataIndex: "firstname",
    key: "firstname",
  },
  {
    title: "Last Name",
    dataIndex: "lastname",
    key: "lastname",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Roles",
    dataIndex: "roles",
    key: "roles",
  },
];

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roles, setRoles] = useState([]);

  const onOkAddModel = (values) => {
    setIsModalOpen(false);
    console.log(values);
  };

  const onCancelAddModel = () => {
    setIsModalOpen(false);
  };

  const buttons = [
    {
      key: "addUser",
      text: "Add User",
      type: "primary",
      onClick: () => setIsModalOpen(true),
    },
  ];

  useEffect(() => {
    axios.get("http://localhost:5000/role").then((res) => {
        setRoles(res.data);
        axios.get("http://localhost:5000/user").then((resUser) => {
            
        })
    })
  }, [])

  return (
    <PageLayout buttons={buttons}>
      <Table dataSource={dataSource} columns={columns} />
      <AddUserModal
        isModalOpen={isModalOpen}
        onOk={onOkAddModel}
        onCancel={onCancelAddModel}
        roles={roles}
      />
    </PageLayout>
  );
};

export default User;
