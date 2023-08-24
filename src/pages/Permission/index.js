import AddPermissionModal from "../../components/AddPermissionModal";
import PageLayout from "../../components/PageLayout";
import { Table } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
];

const Permission = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [permissions, setPermissions] = useState([]);

  const onOkAddPermission = (values) => {
    setIsModalOpen(false);
    //       console.log(values);

    axios.post("http://localhost:5000/permission", values).then((response) => {
  //    console.log(response.data);
      setPermissions((prevState) => [...prevState, response.data]);
    });
  };

  const onCancelAddPermission = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/permission").then((res) => {
      setPermissions(res.data);
    });
  }, []);

  const buttons = [
    {
      key: "addPermission",
      text: "Add Permission",
      type: "primary",
      onClick: () => setIsModalOpen(true),
    },
  ];

  return (
    <PageLayout buttons={buttons}>
      <Table dataSource={permissions} columns={columns} />
      <AddPermissionModal
        isModalOpen={isModalOpen}
        onOk={onOkAddPermission}
        onCancel={onCancelAddPermission}
      />
    </PageLayout>
  );
};

export default Permission;
