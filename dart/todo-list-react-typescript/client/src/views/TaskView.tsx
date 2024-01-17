import { Input } from "reactstrap";
import Icon from "../assets/trash.svg";

interface TaskViewProps {
  task: {
    id: string;
    title: string;
    solved: string;
    url?: string;
  };
  onChange: (id: string, title: string, solved: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskView(props: TaskViewProps) {
  return (
    <div key={props.task.id} className="mb-3">
      <div className="d-flex align-items-center">
        <Input
          type="checkbox"
          onChange={() =>
            props.onChange(
              props.task.id,
              props.task.title,
              props.task.solved === "true" ? "false" : "true"
            )
          }
          checked={props.task.solved === "true" ? true : false}
        />
        <p className="mb-0" style={{ marginRight: "auto", marginLeft: "20px" }}>
          <span>{props.task.title} </span>
          {props.task.url ? <a href={props.task.url}>link</a> : ""}
        </p>
        <div style={{ cursor: "pointer" }}>
            <img
                src={Icon}
                alt="delete"
                style={{ width: "20px" }}
                onClick={() => props.onDelete(props.task.id)}
            />
        </div>
      </div>
    </div>
  );
}
