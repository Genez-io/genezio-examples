import { AuthService } from "@genezio/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Admin(props: { element: React.ReactNode }) {
  const navigate = useNavigate();
  React.useEffect(() => {
    async function checkUserAuth() {
      await AuthService.getInstance()
        .userInfo()
        .catch((error) => {
          console.log("Error checking user auth", error);
          navigate("/auth/login");
        });
    }
    checkUserAuth();
  }, [navigate]);
  return <>{props.element}</>;
}
