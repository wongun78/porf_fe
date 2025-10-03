import React, { useState } from "react";
import { Button, Modal, Form, Input, notification } from "antd";
import { createUserAPI } from "../../services/api.service";

const UserFilter = (props) => {

  const { loadUsers } = props;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setUsername("");
    setEmail("");
    setPassword("");
    setRole("");
  };

  const handleSubmit = async (values) => {
    try {
      const res = await createUserAPI(
        values.username,
        values.email,
        values.password,
        values.role
      );
      console.log("Create user response:", res);

      if (res && res.data) {
        notification.success({
          message: "User created successfully",
          description: `User with email ${values.email} has been created.`,
        });

        setIsModalOpen(false);
        form.resetFields();
        setUsername("");
        setEmail("");
        setPassword("");
        setRole("");

        await loadUsers();
      }
    } catch (error) {
      console.error("Error creating user:", error);
      notification.error({
        message: "Error creating user",
        description:
          error.response?.data?.message ||
          "An error occurred while creating the user.",
      });
    }
  };

  return (
    <>
      <div className="flex items-center space-between mb-4">
        <div>User Management</div>
        <Button type="primary" onClick={handleOpenModal}>
          Add User
        </Button>
      </div>

      <Modal
        title="Create New User"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="createUser"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input username!" }]}
          >
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input password!" }]}
          >
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please input role!" }]}
          >
            <Input value={role} onChange={(e) => setRole(e.target.value)} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserFilter;
