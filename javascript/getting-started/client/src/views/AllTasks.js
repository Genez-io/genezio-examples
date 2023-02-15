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
import React, { useState, useEffect } from "react";
import { Task } from "../sdk/task.sdk.js";
import { useNavigate } from "react-router-dom";
import TaskView from './TaskView.js'
import uuid from 'react-uuid';
import logo from './logo.png';


export default (props) => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [modalAddTask, setModalAddTask] = useState(false);
  const toggleModalAddTask = () => {
    setModalAddTask(!modalAddTask);
    setTaskTitle("");
  };

  const [error, setError] = useState("");

  const [taskTitle, setTaskTitle] = useState("");

  let initialized = false
  useEffect(() => {
    if (!initialized) {
      initialized = true
      let token = localStorage.getItem("apiToken")
      if (!token) {
        token = uuid()
        localStorage.setItem("apiToken", token)
      }
  
      // eslint-disable-next-line no-inner-declarations
      async function fetchTasks() {
        const res = await Task.getAllTasksByUser(
          localStorage.getItem("apiToken"),
        );
        if (res.success) {
          setTasks(res.tasks);
        }
      }
      fetchTasks();
    }
  }, []);

  async function handleDelete(id) {
    const res = await Task.deleteTask(localStorage.getItem("apiToken"), id);
    if (res.success) {
      navigate(0);
    }
  }

  async function handleEdit(id, title, solved) {
    console.log("handle edit called", id, title, solved)
    const res = await Task.updateTask(
      localStorage.getItem("apiToken"),
      id,
      title,
      solved
    );
    if (res.success) {
      const newTasks = tasks.map((task) => {
        if (task._id === id) {
          task.title = title;
          task.solved = solved;
        }
        return task;
      });
      setTasks(newTasks);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!taskTitle) {
      setError("Title is mandatory");
      return;
    }
    const res = await Task.createTask(
      localStorage.getItem("apiToken"),
      taskTitle
    );
    if (res.success) {
      setTasks([...tasks, res.task]);
      setTaskTitle("");
      toggleModalAddTask();
    }
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
                type="Title"
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
                  <img style={{width: "50px" }} src={logo} />
                </div>
                <h3 style={{ marginBottom: "30px", marginTop: "15px", textAlign: "center" }}>Welcome to genezio!</h3>
                <p style={{ marginBottom: "30px", textAlign: "center" }}>You have successfully deployed your first genezio project!</p>
                <p style={{ marginBottom: "30px", textAlign: "center" }}>Here you have a list of resources that you can use to learn how to continue building awesome projects with genezio:</p>

                {tasks.map((task) => (
                  <TaskView key={task._id} task={task} onChange={handleEdit} onDelete={handleDelete}></TaskView>
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
