import React from "react";
import { useNavigate } from "react-router-dom";

export default function Auth(props: any) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem("apiToken") != null) {
      navigate("/admin/all-tasks");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{props.element}</>;
};
