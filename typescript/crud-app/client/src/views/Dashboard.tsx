// client/src/views/Dashboard.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserHandler, User } from "@genezio-sdk/crud-app_us-east-1";
import { PacmanLoader } from "react-spinners";

function Dashboard() {
  const [users, setUsers] = useState<Array<User> | null>(null);
  const navigate = useNavigate();

  const getAllUsers = async () => {
    const res = await UserHandler.getUsers();
    if (!res || !res.success) {
      console.log("error at fetching users");
      return;
    }
    setUsers(res.users || null);

    console.log(res.users);
  };

  const deleteUser = async (email: string) => {
    const res = await UserHandler.deleteUser(email);
    if (!res || !res.success) {
      alert("There was an error at deleting the user, please try again later");
      return;
    }
    if (users != null) {
      const newUsers = users.filter((element) => {
        return element.email != email;
      });
      setUsers([...newUsers]);
    }
  };

  const handleSubmit = async (event: any, email: string) => {
    event.preventDefault();
    var answer = window.confirm("Are you sure you want to delete this user?");
    if (answer) {
      await deleteUser(email);
    } else {
      console.log("we dont delete the user");
      return;
    }
  };

  const handleNavigate = (event: any) => {
    event.preventDefault();
    navigate("/addUser");
  };

  useEffect(() => {
    if (!users) {
      getAllUsers();
    }
  }, [users]);
  return !users ? (
    <PacmanLoader color="#ffe4c4" className="loader" />
  ) : (
    <div className="dashboard">
      <div className="header-all">Users management system</div>
      <div className="header">All users</div>
      {users.length !== 0 ? (
        <div className="users-container">
          {users.map((element) => {
            return (
              <div className="user" key={element.userId}>
                <div>Name : {element.name}</div>
                <div>Email : {element.email}</div>
                <div>Verified : {element.verified.toString()}</div>
                <div>
                  <button
                    onClick={() => navigate("/editUser/" + element.email)}
                  >
                    Edit
                  </button>
                </div>
                <div>
                  <button
                    onClick={(event) => handleSubmit(event, element.email)}
                  >
                    Delete{" "}
                  </button>
                </div>
              </div>
            );
          })}
          <button onClick={handleNavigate}>Add User</button>
        </div>
      ) : (
        <div className="users-container">
          <div>No users availabale</div>
          <button onClick={handleNavigate}>Add User</button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
