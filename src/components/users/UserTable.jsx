import UserUpdateModal from "./UserUpdateModal";
import { useState } from "react";

const UserTable = (props) => {
  const { users } = props;

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  // Thêm safety check
  if (!users || !Array.isArray(users)) {
    return <div>Loading users...</div>;
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <td className="text-gray-500">{user._id}</td>
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
                  <button className="bg-red-500 text-white px-4 py-2 rounded">
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
      />
    </>
  );
};

export default UserTable;
