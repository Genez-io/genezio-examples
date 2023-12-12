import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup,
  Alert,
} from "reactstrap";
import { useState, useEffect } from "react";
import {
  TaskService,
  Task,
  GetTasksResponse,
} from "@genezio-sdk/todo-list-ts_us-east-1";
import { useNavigate } from "react-router-dom";
import { User } from "@genezio-sdk/todo-list-ts_us-east-1";

export default function AllTasks() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<User>({
    name: "no name",
    email: "no email",
    _id: "",
  });
  const [token, setToken] = useState<string>("");
  const [modalAddTask, setModalAddTask] = useState(false);
  const toggleModalAddTask = () => {
    setModalAddTask(!modalAddTask);
    setTaskTitle("");
  };

  const [error, setError] = useState("");
  const [alertErrorMessage, setAlertErrorMessage] = useState<string>("");

  const [taskTitle, setTaskTitle] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("apiToken");

    if (!user || !token) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(localStorage.getItem("user")!));
    setToken(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    TaskService.getAllTasksByUser(token, user._id).then(
      (result: GetTasksResponse) => {
        if (result.success) {
          setTasks(result.tasks);
        } else {
          if (result.err) {
            setAlertErrorMessage(
              `Unexpected error: ${
                result.err
                  ? result.err
                  : "Please check the backend logs in the project dashboard - https://app.genez.io."
              }`
            );
          }
        }
      }
    );
  }, [user, token]);

  async function handleDelete(id: string) {
    const res = await TaskService.deleteTask(token, id);
    if (res.success) {
      navigate(0);
    } else {
      navigate(0);
      setAlertErrorMessage(
        `Unexpected error: ${
          res.err
            ? res.err
            : "Please check the backend logs in the project dashboard - https://app.genez.io."
        }`
      );
    }
  }

  async function handleEdit(id: string, title: string, solved: boolean) {
    const res = await TaskService.updateTask(token, id, title, solved);
    if (res.success) {
      const newTasks = tasks.map((task) => {
        if (task._id === id) {
          task.title = title;
          task.solved = solved;
        }
        return task;
      });
      setTasks(newTasks);
    } else {
      setAlertErrorMessage(
        `Unexpected error: ${
          res.err
            ? res.err
            : "Please check the backend logs in the project dashboard - https://app.genez.io."
        }`
      );
    }
  }

  async function handleAdd(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!taskTitle) {
      setError("Title is mandatory");
      return;
    }
    const res = await TaskService.createTask(token, taskTitle, user._id);
    if (res.success) {
      setTasks([...tasks, res.task!]);
      setTaskTitle("");
      toggleModalAddTask();
    } else {
      setAlertErrorMessage(
        `Unexpected error: ${
          res.err
            ? res.err
            : "Please check the backend logs in the project dashboard - https://app.genez.io."
        }`
      );
    }
  }

  return alertErrorMessage != "" ? (
    <Row className="ms-5 me-5 ps-5 pe-5 mt-5 pt-5">
      <Alert color="danger">{alertErrorMessage}</Alert>
    </Row>
  ) : (
    <>
      <Modal isOpen={modalAddTask} toggle={toggleModalAddTask}>
        <ModalHeader toggle={toggleModalAddTask}>Add new task</ModalHeader>
        <form>
          <ModalBody>
            <span className="text-danger">{error}</span>
            <div className="mb-3">
              <label>Task Title</label>
              <Input
                className="form-control"
                placeholder="Title"
                autoComplete="Title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e) => handleAdd(e)} type="submit">
              Add
            </Button>
            <Button color="secondary" onClick={toggleModalAddTask}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
      <Container className="mt-2">
        <Card className="p-4 mt-2">
          <Row className="mt-2">
            <Col sm="11">
              <h3>All Tasks</h3>

              <Row>
                <Col sm="12">
                  {tasks.map((task) => (
                    <div key={task._id} className="mb-3">
                      <p className="mb-0">
                        <span className="h4">{task.title}</span> -{" "}
                        {task.solved ? "Solved" : "Not Solved"}
                      </p>
                      <ButtonGroup aria-label="Basic example">
                        <Button
                          color="danger"
                          onClick={() => handleDelete(task._id)}
                        >
                          Delete Task
                        </Button>
                        <Button
                          color="primary"
                          onClick={() =>
                            handleEdit(task._id, task.title, !task.solved)
                          }
                        >
                          {task.solved ? "Mark as Unsolved" : "Mark as Solved"}
                        </Button>
                      </ButtonGroup>
                    </div>
                  ))}
                </Col>

                <Col sm="3" className="mt-4">
                  <Button
                    color="primary"
                    onClick={() => {
                      toggleModalAddTask();
                    }}
                  >
                    Add Task
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col sm="1" className="text-right">
              <Button
                color="primary"
                onClick={() => {
                  localStorage.removeItem("apiToken");
                  localStorage.removeItem("user");
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
}
