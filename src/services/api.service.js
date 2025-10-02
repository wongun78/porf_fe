import axios from "./api.customize";

const createUserAPI = async (username, email, password, role) => {
  const userData = {
    username: username,
    email: email,
    password: password,
    role: role,
  };
  return await axios.post("/api/users", userData);
};

const updateUserAPI = async (_id, username, email, role) => {
  const userData = {
    username: username,
    email: email,
    role: role,
  };
  return await axios.put(`/api/users/${_id}`, userData);
};
const deleteUserAPI = async (id) => {
  return await axios.delete(`/api/users/${id}`);
};

const fetchUsersAPI = async () => {
  return await axios.get("/api/users");
};

export { createUserAPI, fetchUsersAPI, updateUserAPI, deleteUserAPI };
