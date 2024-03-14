import { Input } from "reactstrap";
import Icon from "./trash.svg";

type TaskViewProps = {
    task: {
        id: string;
        title: string;
        solved: boolean;
        url?: string;
    };
    onChange: (id: string, title: string, solved: boolean) => void;
    onDelete: (id: string) => void;
};


export default function TaskView(props: TaskViewProps) {
  return (
    <div key={props.task.id} className="mb-3">
      <div className="d-flex align-items-center">
        <Input
          type="checkbox"
          onChange={() =>
            props.onChange(props.task.id, props.task.title, !props.task.solved)
          }
          checked={props.task.solved}
        />
        <p className="mb-0" style={{ marginRight: "auto", marginLeft: "20px" }}>
          <span>{props.task.title} </span>
          {props.task.url ? <a href={props.task.url}>link</a> : ""}
        </p>
        <div style={{ cursor: "pointer" }}>
          <img src={Icon} onClick={() => props.onDelete(props.task.id)} />
        </div>
      </div>
    </div>
  );
}
