import React from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "@genezio-sdk/todo-list-ts_us-east-1"

export default function Admin(props: any) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (
      localStorage.getItem("apiToken") == null ||
      localStorage.getItem("user") == null
    ) {
      localStorage.clear();
      navigate("/login");
    }

    async function checkToken() {
      const apiToken = localStorage.getItem("apiToken");
      if (!apiToken) {
        navigate("/login");
        return;
      }
      
      const res = await UserService.checkSession(apiToken);
      if (!res.success) {
        localStorage.clear();
        navigate("/login");
      }
    }
    checkToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{props.element}</>;
};
