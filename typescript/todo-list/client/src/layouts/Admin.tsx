import React from "react";
import { useNavigate } from "react-router-dom";

export default function Admin(props: { element: React.ReactNode }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (
      localStorage.getItem("apiToken") == null ||
      localStorage.getItem("user") == null
    ) {
      navigate("/login");
    }
  }, []);

  return <>{props.element}</>;
}
