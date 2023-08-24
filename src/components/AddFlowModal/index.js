import { Button, Form, Input, Modal, Select } from "antd";

const AddFlowModal = ({ isModalOpen, onOk, onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    //    console.log(values);
    onOk(values);
    form.resetFields();
  };

  return (
    <Modal
      title="Add Flow"
      open={isModalOpen}
      onCancel={onCancel}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <Form
        form={form}
        name="add-flow"
        onFinish={onFinish}
        wrapperCol={{ span: 16 }}
        labelCol={{ span: 8 }}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="tasks" label="Tasks" rules={[{ required: true }]}>
          <Select mode="multiple" placeholder="Select a task">
            <Select.Option value="task1">task1</Select.Option>
            <Select.Option value="task2">task2</Select.Option>
            <Select.Option value="task3">task3</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Add Task
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddFlowModal;
