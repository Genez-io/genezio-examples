import { AuthService } from "@genezio/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Auth(props) {
  const navigate = useNavigate();

  React.useEffect(() => {
    async function checkUserAuth() {
      try {
        await AuthService.getInstance().userInfo();
        navigate("/admin/all-tasks");
      } catch (error) {
        return;
      }
    }
    checkUserAuth();
  }, [navigate]);

  return <>{props.element}</>;
}
