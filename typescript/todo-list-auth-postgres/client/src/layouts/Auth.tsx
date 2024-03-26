import React from "react";
import { useNavigate } from "react-router-dom";

export default function Auth(props: { element: React.ReactNode }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem("apiToken") != null) {
      navigate("/admin/all-tasks");
    }
  }, [navigate]);

  return <>{props.element}</>;
}
