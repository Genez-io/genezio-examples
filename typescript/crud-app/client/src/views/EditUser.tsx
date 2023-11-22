// client/src/views/EditUser.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserHandler, User } from "@genezio-sdk/crud-app_us-east-1";
import PacmanLoader from "react-spinners/PacmanLoader";

function EditUser() {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState<string>("");
  const [verified, setVerified] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  const getUser = async (email: string) => {
    const res = await UserHandler.getUserByEmail(email);
    if (!res || !res.success) {
      navigate("/dashboard");
      return;
    }
    setName(res.user!.name);
    setVerified(res.user!.verified);
    setUser(res.user!);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (name == "") {
      setError("Name is mandatory");
      return;
    }
    if (verified == null) {
      setError("Verified is mandatory");
      return;
    }
    const newUser = {
      userId: user!.userId,
      email: user!.email,
      name: name,
      verified: verified,
    };
    const res = await UserHandler.updateUser(user!.email, newUser);
    if (!res) {
      setError("Unexpected error, please try again later");
      return;
    }
    if (!res.success) {
      setError(res.msg || "");
      return;
    }

    alert("User updated successfully!");
    navigate("/dashboard");
  };
  useEffect(() => {
    if (!user && params) {
      getUser(params.email || "");
    }
  }, [user, params]);

  return user ? (
    <div className="edit-user">
      <div className="header-all">User management system</div>
      <div className="header">Edit user</div>
      <div className="edit-user-container">
        <form className="edit-user-form">
          <div className="form-group">
            <label>Email</label>
            <div>{user.email}</div>
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              id="name"
              name="name"
              placeholder="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Verified</label>
            <div className="radio-button-container">
              <input
                name="verified"
                type="radio"
                value="true"
                defaultChecked={verified == true}
                onClick={() => setVerified(true)}
              />
              True
            </div>
            <div className="radio-button-container">
              <input
                name="verified"
                type="radio"
                value="false"
                defaultChecked={!verified == true}
                onClick={() => setVerified(false)}
              />
              False
            </div>
          </div>
          <div className="submit">
            <button onClick={handleSubmit}>Edit user</button>
          </div>
          {error != "" ? <div className="error-alert">{error}</div> : <></>}
        </form>
      </div>
    </div>
  ) : (
    <PacmanLoader color="#ffe4c4" className="loader" />
  );
}

export default EditUser;
