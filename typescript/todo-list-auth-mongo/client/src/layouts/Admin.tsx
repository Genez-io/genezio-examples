import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "@genezio/auth";
export default function Admin(props: { element: React.ReactNode }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    async function checkAuth() {
      try {
        await AuthService.getInstance().userInfo();
      } catch (error: any) {
        console.log(
          `Error: message: ${error.message}, statusCode: ${error.statusCode}`
        );

        navigate("/login");
      }
    }
    checkAuth();
  }, []);

  return <>{props.element}</>;
}
