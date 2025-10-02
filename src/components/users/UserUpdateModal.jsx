import React, { useState } from "react";
import { Button, Modal, Form, Input, notification } from "antd";
import { updateUserAPI } from "../../services/api.service";
import { useEffect } from "react";

const UserUpdateModal = ({
  userId,
  username: initialUsername,
  email: initialEmail,
  role: initialRole,
  open,
  setOpen,
}) => {
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

    setUsername("");
    setEmail("");
    setRole("");
  };

  const handleSubmit = async () => {
    try {
      const res = await updateUserAPI(userId, username, email, role);
      console.log("Update user response:", res);

      if (res && res.data) {
        notification.success({
          message: "User updated successfully",
          description: `User with email ${email} has been updated.`,
        });

        setOpen(false);

        setUsername("");
        setEmail("");
        setRole("");
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
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please input role!" }]}
          >
            <Input value={role} onChange={(e) => setRole(e.target.value)} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
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
