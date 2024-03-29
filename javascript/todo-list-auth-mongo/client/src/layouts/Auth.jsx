import { AuthService } from "@genezio/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Auth(props) {
  const navigate = useNavigate();

  React.useEffect(() => {
    async function checkUserAuth() {
      try {
        await AuthService.getInstance().userInfo();
        if (props.authetificatedRedirect) {
          navigate(props.authetificatedRedirect);
          return;
        }
        navigate("/admin/all-tasks");
        return;
      } catch (error) {
        if (error.message === "Invalid session token.") {
          if (props.unauthetificatedRedirect) {
            navigate(props.unauthetificatedRedirect);
            return;
          }
          navigate("/login");
          return;
        }
        console.log(
          `Error: message: ${error.message}, statusCode: ${error.statusCode}`
        );
        navigate("/login");

        return;
      }
    }
    checkUserAuth();
  }, [navigate]);

  return <>{props.children}</>;
}
