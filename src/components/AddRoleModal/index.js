import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";

const AddRoleModal = ({
  isModalOpen,
  onOk,
  onCancel,
  permissions,
  initialValues,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    //    console.log(values);
    onOk(values);
    form.resetFields();
  };

  useEffect(() => {
    if (form) {
      form.setFieldsValue(initialValues);
    }
  }, [form]);

  return (
    <Modal
      title="Add Role"
      open={isModalOpen}
      onCancel={onCancel}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <Form
        form={form}
        name="add-role"
        onFinish={onFinish}
        wrapperCol={{ span: 16 }}
        labelCol={{ span: 8 }}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="permissions"
          label="Permissions"
          rules={[{ required: true }]}
        >
          <Select mode="multiple" placeholder="Select a permission">
            {permissions.map((permission) => {
              return (
                <Select.Option key={permission.id} value={permission.id}>
                  {permission.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Add Role
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRoleModal;
