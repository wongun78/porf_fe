import UserTable from "../components/users/UserTable";
import UserFilter from "../components/users/UserFilter";
import { fetchUsersAPI } from "../services/api.service";

import { useState, useEffect } from "react";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await fetchUsersAPI();
      console.log("Fetched users:", response.data);
      const userData = response.data;
      setUsers(userData);
      setError(null);
    } catch (error) {
      setError("Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white">
      <UserFilter fetchAllUsers={loadUsers} />
      <UserTable users={users} />
    </div>
  );
};

export default UserPage;
