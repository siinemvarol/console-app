import PageLayout from "../../components/PageLayout";
import { Button, Table } from "antd";
import AddRoleModal from "../../components/AddRoleModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { Tag } from "antd";
import { EditOutlined } from "@ant-design/icons";

const Role = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [initialValues, setInitialValues] = useState([]);
  const [search, setSearch] = useState("");

  const buttons = [
    {
      key: "addRole",
      text: "Add Role",
      type: "primary",
      onClick: () => {
        setIsModalOpen(true);
        setInitialValues(null);
      },
    },
  ];

  const onOkAddRole = (values) => {
    setIsModalOpen(false);
    console.log(values);

    if (initialValues) {
      axios
        .put(`http://localhost:5000/role/${initialValues.id}`, {
          ...values,
          permissions: values.permissions.join(","),
        })
        .then((res) => {
          setRoles((prevState) => {
            return prevState.map((r) => {
              if (res.data.id == r.id) {
                return {
                  ...res.data,
                  permissions: values.permissions.map((permissionId) => {
                    return permissions.find((p) => p.id === permissionId);
                  }),
                };
              }
              return r;
            });
          });
        });
    } else {
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
    }
  };

  const onCancelAddRole = () => {
    setIsModalOpen(false);
  };

  const onClickEdit = (row) => {
    setIsModalOpen(true);
    const permissionIds = row.permissions.map((permission) => permission.id);
    setInitialValues({ ...row, permissions: permissionIds });
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
    <PageLayout buttons={buttons} onSearch={onSearch}>
      <Table
        dataSource={roles.filter((role) => {
          return role.name.includes(search);
        })}
        columns={columns}
        rowKey="id"
      />
      {isModalOpen && (
        <AddRoleModal
          isModalOpen={isModalOpen}
          onOk={onOkAddRole}
          onCancel={onCancelAddRole}
          initialValues={initialValues}
          permissions={permissions}
        />
      )}
    </PageLayout>
  );
};

export default Role;
