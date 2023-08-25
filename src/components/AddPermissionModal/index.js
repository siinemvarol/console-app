import { Button, Form, Input, Modal } from "antd";
import { useEffect } from "react";

const AddPermissionModal = ({ isModalOpen, onOk, onCancel, initialValues }) => {
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
      title="Add Permission"
      open={isModalOpen}
      onCancel={onCancel}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <Form
        form={form}
        name="add-permission"
        onFinish={onFinish}
        wrapperCol={{ span: 16 }}
        labelCol={{ span: 8 }}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Add Permission
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPermissionModal;
