import UserUpdateModal from "./UserUpdateModal";
import { useState } from "react";
import { deleteUserAPI } from "../../services/api.service";
import { notification } from "antd";

const UserTable = (props) => {
  const { users, loadUsers } = props;

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleDelete = async (userId, userEmail) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this user?");
      if (confirmed) {
        const res = await deleteUserAPI(userId);
        console.log("Delete user response:", res);

        if (res && res.data) {
          notification.success({
            message: "User deleted successfully",
            description: `User with email ${userEmail} has been deleted.`,
          });
          await loadUsers();
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      notification.error({
        message: "Error deleting user",
        description:
          error.response?.data?.message ||
          "An error occurred while deleting the user.",
      });
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <td className="text-gray-500">
                  <img
                    src={user.avatar}
                    alt={user.username || "User avatar"}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/40x40?text=User"
                    }}
                  />
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => {
                      setOpenUpdateModal(true);
                      setUserId(user._id);
                      setUsername(user.username);
                      setEmail(user.email);
                      setRole(user.role);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                    onClick={() => handleDelete(user._id, user.email)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <UserUpdateModal
        userId={userId}
        username={username}
        email={email}
        role={role}
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        loadUsers={loadUsers}
      />
    </>
  );
};

export default UserTable;
