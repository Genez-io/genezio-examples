import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "@genezio/auth";
export default function Admin(props: { element: React.ReactNode }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    try {
      AuthService.getInstance();
    } catch (error: any) {
      console.log(
        `Error: message: ${error.message}, statusCode: ${error.statusCode}`
      );

      navigate("/login");
      return;
    }
  }, []);

  return <>{props.element}</>;
}
