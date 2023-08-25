import { useEffect, useState } from "react";
import AddUserModal from "../../components/AddUserModal";
import PageLayout from "../../components/PageLayout";
import { Table, Tag } from "antd";
import axios from "axios";

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
    render: (cell, row) => {
      return cell.map((item) => (
        <Tag color="green" key={item.id}>
          {item.name}
        </Tag>
      ));
    },
  },
];

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);

  const onOkAddModel = (values) => {
    setIsModalOpen(false);
    console.log(values);
    const newUser = {
      firstname: values.firstname,
      lastname: values.lastname,
      gender: values.gender,
      roles: values.roles.join(","),
    };
    axios.post("http://localhost:5000/user", newUser).then((res) => {
      setUsers((prevState) => [
        ...prevState,
        {
          ...res.data,
          roles: values.roles.map(
            (rId) => roles.filter((rl) => rl.id === parseInt(rId))[0]
          ),
        },
      ]);
    });
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
        const usersData = resUser.data.map((user) => {
          return {
            ...user,
            roles: user.roles.split(",").map((rId) => {
              return res.data.filter((r) => r.id === parseInt(rId))[0];
            }),
          };
        });
        setUsers(usersData);
      });
    });
  }, []);

  return (
    <PageLayout buttons={buttons}>
      <Table dataSource={users} columns={columns} rowKey="id" />
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
