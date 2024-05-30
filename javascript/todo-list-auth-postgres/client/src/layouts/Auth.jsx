import { AuthService } from "@genezio/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Auth(props) {
  const navigate = useNavigate();

  React.useEffect(() => {
    async function checkUserAuth() {
      const result = await AuthService.getInstance()
        .userInfo()
        .catch(() => {
          return null;
        });
      if (result) {
        navigate("/admin/all-tasks");
      }
    }
    checkUserAuth();
  }, [navigate]);

  return <>{props.element}</>;
}
