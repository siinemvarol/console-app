import PageLayout from "../../components/PageLayout";
import { Table } from "antd";
import AddRoleModal from "../../components/AddRoleModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { Tag } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Permissions",
    dataIndex: "permissions",
    key: "permissions",
    render: (cell, row) => {
      return cell.map((item) => (
        <Tag color="green" key={item.id}>
          {item.name}
        </Tag>
      ));
    },
  },
];

const Role = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);

  const buttons = [
    {
      key: "addRole",
      text: "Add Role",
      type: "primary",
      onClick: () => setIsModalOpen(true),
    },
  ];

  const onOkAddRole = (values) => {
    setIsModalOpen(false);
    console.log(values);
    const newRole = {
      name: values.name,
      permissions: values.permissions.join(","),
    };
    axios.post("http://localhost:5000/role", newRole).then((res) => {
      setRoles((prevState) => [
        ...prevState,
        {
          ...res.data,
          permissions: values.permissions.map(
            (pId) => permissions.filter((per) => per.id === parseInt(pId))[0]
          ),
        },
      ]);
    });
  };

  const onCancelAddRole = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/permission").then((res) => {
      setPermissions(res.data);
      axios.get("http://localhost:5000/role").then((resRole) => {
        const rolesData = resRole.data.map((role) => {
          return {
            ...role,
            permissions: role.permissions.split(",").map((id) => {
              return res.data.filter((p) => p.id === parseInt(id))[0];
            }),
          };
        });
        setRoles(rolesData);
      });
    });
  }, []);

  return (
    <PageLayout buttons={buttons}>
      <Table dataSource={roles} columns={columns} rowKey="id" />
      <AddRoleModal
        isModalOpen={isModalOpen}
        onOk={onOkAddRole}
        onCancel={onCancelAddRole}
        permissions={permissions}
      />
    </PageLayout>
  );
};

export default Role;
