import React, { useState } from "react";
import { Button, Modal, Form, Input, notification } from "antd";
import { updateUserAPI } from "../../services/api.service";
import { useEffect } from "react";

const UserUpdateModal = (props) => {
  const {
    userId,
    username: initialUsername,
    email: initialEmail,
    role: initialRole,
    open,
    setOpen,
    loadUsers } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      setUsername(initialUsername || "");
      setEmail(initialEmail || "");
      setRole(initialRole || "");
      form.setFieldsValue({
        username: initialUsername || "",
        email: initialEmail || "",
        role: initialRole || "",
      });
    }
  }, [open, initialUsername, initialEmail, initialRole, form]);

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
    setUsername("");
    setEmail("");
    setRole("");
  };

  const handleSubmit = async (values) => {
    try {
      const res = await updateUserAPI(userId, values.username, values.email, values.role);
      console.log("Update user response:", res);

      if (res && res.data) {
        notification.success({
          message: "User updated successfully",
          description: `User with email ${values.email} has been updated.`,
        });

        setOpen(false);
        form.resetFields();
        setUsername("");
        setEmail("");
        setRole("");
        await loadUsers();
      }
    } catch (error) {
      console.error("Error updating user:", error);
      notification.error({
        message: "Error updating user",
        description:
          error.response?.data?.message ||
          "An error occurred while updating the user.",
      });
    }
  };

  // Sync state với form khi user type
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    form.setFieldsValue({ username: value });
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    form.setFieldsValue({ email: value });
  };

  const handleRoleChange = (e) => {
    const value = e.target.value;
    setRole(value);
    form.setFieldsValue({ role: value });
  };

  return (
    <>
      <Modal
        title="Update User"
        open={open}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="updateUser"
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
              onChange={handleUsernameChange}
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
            <Input value={email} onChange={handleEmailChange} />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please input role!" }]}
          >
            <Input value={role} onChange={handleRoleChange} />
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

export default UserUpdateModal;
