import {
  Button,
  Container,
  Row,
  Col,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useState, useEffect } from "react";
import { Task, TaskModel } from "../sdk/task.sdk";
import { useNavigate } from "react-router-dom";
import TaskView from './TaskView';
import uuid from 'react-uuid';
import logo from './logo.png';


export default function AllTasks() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<any[]>([]);
  const [modalAddTask, setModalAddTask] = useState<boolean>(false);
  const toggleModalAddTask = () => {
    setModalAddTask(!modalAddTask);
    setTaskTitle("");
  };

  const [error, setError] = useState<string>("");

  const [taskTitle, setTaskTitle] = useState("");

  let initialized = false

  // eslint-disable-next-line no-inner-declarations
  async function fetchTasks() {
    const res = await Task.getAllTasksByUser(
      localStorage.getItem("apiToken") || "",
    );
      setTasks(res);
  }
  useEffect(() => {
    if (!initialized) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      initialized = true
      let token = localStorage.getItem("apiToken")
      if (!token) {
        token = uuid()
        localStorage.setItem("apiToken", token)
      }

      fetchTasks();
    }
  }, []);

  async function handleDelete(id: string) {
    console.log("handle delete called", id)
    const res = await Task.deleteTask(localStorage.getItem("apiToken") || "", id);
    if (res === "success") {
      navigate(0);
    }
  }

  async function handleEdit(id: string, title: string, solved: string) {
    console.log("handle edit called", id, title, solved)
    await Task.updateTask(
      localStorage.getItem("apiToken") || "",
      id,
      title,
      "",
      solved
    );

    const newTasks = tasks.map((task: TaskModel) => {
      if (task.id === id) {
        task.title = title;
        task.solved = solved;
      }
      return task;
    });
    setTasks(newTasks);
  }

  async function handleAdd(e: any) {
    e.preventDefault();
    setError("");
    if (!taskTitle) {
      setError("Title is mandatory");
      return;
    }
    const res = await Task.createTask(
      localStorage.getItem("apiToken") || "",
      taskTitle,
      ""
    );
    setTasks([...tasks, res]);
    setTaskTitle(taskTitle);
    toggleModalAddTask();
  }

  return (
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
                type="text"
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

        <Row className="mt-2">
          <Col sm="12">
            <Row>
              <Col sm="2" className="mt-4">
              </Col>
              <Col sm="8" style={{ backgroundColor: "white" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img style={{width: "50px" }} src={logo} alt="logo" />
                </div>
                <h3 style={{ marginBottom: "30px", marginTop: "15px", textAlign: "center" }}>Welcome to genezio!</h3>
                <p style={{ marginBottom: "30px", textAlign: "center" }}>You have successfully deployed your first genezio project!</p>
                <p style={{ marginBottom: "30px", textAlign: "center" }}>Here you have a list of resources that you can use to learn how to continue building awesome projects with genezio:</p>

                {tasks.map((task: TaskModel) => (
                  <TaskView key={task.id} task={task} onChange={handleEdit} onDelete={handleDelete}></TaskView>
                ))}
                <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                  <Button outline color="secondary" onClick={() => {
                    toggleModalAddTask();
                  }}>Add New Task</Button>
                </div>
              </Col>

              <Col sm="2" className="mt-4">
              </Col>
            </Row>
          </Col>
        </Row>

      </Container>
    </>
  );
};
