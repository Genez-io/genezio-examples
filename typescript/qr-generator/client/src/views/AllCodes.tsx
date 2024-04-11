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
import { CodeService, Code, GetCodesResponse } from "@genezio-sdk/qr-generator";
import { useNavigate } from "react-router-dom";
import { AuthService } from "@genezio/auth";

export default function AllCodes() {
  const navigate = useNavigate();

  const [codes, setCodes] = useState<Code[]>([]);
  const [codesImages, setCodesImages] = useState<string[]>([]);
  const [modalAddCode, setModalAddCode] = useState(false);
  const toggleModalAddCode = () => {
    setModalAddCode(!modalAddCode);
    setCodeTitle("");
  };

  const [error, setError] = useState("");
  const [alertErrorMessage, setAlertErrorMessage] = useState<string>("");

  const [codeTitle, setCodeTitle] = useState("");
  const [codeText, setCodeText] = useState("");

  useEffect(() => {
    CodeService.getAllCodes().then((result: GetCodesResponse) => {
      if (result.success) {
        setCodes(result.codes);
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
    });
  }, []);

  useEffect(() => {
    if (codes) {
      console.log(codes);
    }
  }, [codes]);

  async function handleDelete(id: number) {
    const res = await CodeService.deleteCode(id);
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

  async function handleEdit(id: number, title: string, codeText: string) {
    const res = await CodeService.updateCode(id, title, codeText);
    if (res.success) {
      const newCodes = codes.map((code) => {
        if (code.codeId === id) {
          code.title = title;
          code.codeText = codeText;
        }
        return code;
      });
      setCodes(newCodes);
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

  async function generateCode(codeText: string) {}

  async function handleAdd(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!codeTitle) {
      setError("Title is mandatory");
      return;
    }
    if (!codeText) {
      setError("Text is mandatory");
      return;
    }
    const res = await CodeService.createCode(codeTitle, codeText);
    if (res.success) {
      setCodes([...codes, res.code!]);
      setCodeTitle("");
      setCodeText("");
      toggleModalAddCode();
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
      <Modal isOpen={modalAddCode} toggle={toggleModalAddCode}>
        <ModalHeader toggle={toggleModalAddCode}>Add new code</ModalHeader>
        <form>
          <ModalBody>
            <span className="text-danger">{error}</span>
            <div className="mb-3">
              <label>Code Title</label>
              <Input
                className="form-control"
                placeholder="Title"
                autoComplete="Title"
                value={codeTitle}
                onChange={(e) => setCodeTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Code Text</label>
              <Input
                className="form-control"
                placeholder="Text"
                autoComplete="Text"
                value={codeText}
                onChange={(e) => setCodeText(e.target.value)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e) => handleAdd(e)} type="submit">
              Add
            </Button>
            <Button color="primary" onClick={(e) => handleAdd(e)} type="submit">
              Add
            </Button>
            <Button color="secondary" onClick={toggleModalAddCode}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
      <Container className="mt-2">
        <Card className="p-4 mt-2">
          <Row className="mt-2">
            <Col sm="11">
              <h3>All Codes</h3>

              <Row>
                <Col sm="12">
                  {codes.map((code, index) => (
                    <div key={code.codeId} className="mb-3">
                      <p className="mb-0">
                        <span className="h4">{code.title}</span> -{" "}
                        <img src={codesImages[index]} alt="N/A" />
                      </p>
                      <ButtonGroup aria-label="Basic example">
                        <Button
                          color="danger"
                          onClick={() => handleDelete(code.codeId)}
                        >
                          Delete Code
                        </Button>
                      </ButtonGroup>
                    </div>
                  ))}
                </Col>

                <Col sm="3" className="mt-4">
                  <Button
                    color="primary"
                    onClick={() => {
                      toggleModalAddCode();
                    }}
                  >
                    Add Code
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col sm="1" className="text-right">
              <Button
                color="primary"
                onClick={async () => {
                  await AuthService.getInstance().logout();
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
