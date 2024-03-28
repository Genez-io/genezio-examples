import { AuthService } from "@genezio/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Admin(props) {
  const navigate = useNavigate();

  React.useEffect(() => {
    try {
      AuthService.getInstance();
    } catch (error) {
      console.log(
        `Error: message: ${error.message}, statusCode: ${error.statusCode}`
      );

      navigate("/login");
      return;
    }
  }, []);

  return <>{props.element}</>;
}
