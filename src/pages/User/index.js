import { useEffect, useState } from "react";
import AddUserModal from "../../components/AddUserModal";
import PageLayout from "../../components/PageLayout";
import { Button, Table, Tag } from "antd";
import axios from "axios";
import { EditOutlined } from "@ant-design/icons";

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [initialValues, setInitialValues] = useState([]);
  const [search, setSearch] = useState("");

  const buttons = [
    {
      key: "addUser",
      text: "Add User",
      type: "primary",
      onClick: () => {
        setIsModalOpen(true);
        setInitialValues(null);
      },
    },
  ];

  const onOkAddModel = (values) => {
    setIsModalOpen(false);
    console.log(values);

    if (initialValues) {
      axios
        .put(`http://localhost:5000/user/${initialValues.id}`, {
          ...values,
          roles: values.roles.join(","),
        })
        .then((res) => {
          setUsers((prevState) => {
            return prevState.map((u) => {
              if (res.data.id === u.id) {
                return {
                  ...res.data,
                  roles: values.roles.map((roleId) => {
                    return roles.find((r) => r.id === roleId);
                  }),
                };
              }
              return u;
            });
          });
        });
    } else {
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
    }
  };

  const onCancelAddModel = () => {
    setIsModalOpen(false);
  };

  const onClickEdit = (row) => {
    setIsModalOpen(true);
    const roleIds = row.roles.map((role) => role.id);
    setInitialValues({ ...row, roles: roleIds });
  };

  const onSearch = (value) => {
    setSearch(value);
  };

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
    <PageLayout buttons={buttons} onSearch={onSearch}>
      <Table
        dataSource={users.filter((user) => {
          return (
            user.firstname.includes(search) || user.lastname.includes(search)
          );
        })}
        columns={columns}
        rowKey="id"
      />
      {isModalOpen && (
        <AddUserModal
          isModalOpen={isModalOpen}
          onOk={onOkAddModel}
          onCancel={onCancelAddModel}
          initialValues={initialValues}
          roles={roles}
        />
      )}
    </PageLayout>
  );
};

export default User;
