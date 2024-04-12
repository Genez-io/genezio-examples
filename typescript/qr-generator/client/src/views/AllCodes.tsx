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
import axios from "axios";

export default function AllCodes() {
  const navigate = useNavigate();

  const apiURL =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";
  const [codes, setCodes] = useState<Code[]>([]);
  const [codesImages, setCodesImages] = useState<string[]>([]);
  const [modalAddCode, setModalAddCode] = useState(false);
  const toggleModalAddCode = () => {
    setModalAddCode(!modalAddCode);
    setCodeTitle("");
  };

  const [errorTitle, setErrorTitle] = useState("");
  const [errorText, setErrorText] = useState("");
  const [alertErrorMessage, setAlertErrorMessage] = useState<string>("");

  const [codeTitle, setCodeTitle] = useState("");
  const [codeText, setCodeText] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  useEffect(() => {
    CodeService.getAllCodes().then((result: GetCodesResponse) => {
      if (result.success) {
        setCodes(result.codes);
        const images = result.codes.map((code) => apiURL + code.codeText);
        setCodesImages(images);
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

  async function handleDelete(id: number) {
    const res = await CodeService.deleteCode(id);
    if (res.success) {
      setCodes(codes.filter((code) => code.codeId !== id));
      setCodesImages(
        codesImages.filter((_, index) => codes[index].codeId !== id)
      );
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

  function generateCode(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (!codeText) {
      setErrorText("Text is mandatory");
      return;
    }
    setGeneratedCode(apiURL + codeText);
  }

  async function handleAdd(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!codeTitle) {
      setErrorTitle("Title is mandatory");
      return;
    }
    if (!codeText) {
      setErrorText("Text is mandatory");
      return;
    }
    const res = await CodeService.createCode(codeTitle, codeText);
    if (res && res.success) {
      setCodes([...codes, res.code!]);
      setCodesImages([...codesImages, apiURL + res.code!.codeText]);
      setCodeTitle("");
      setCodeText("");
      setGeneratedCode("");
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

  async function handleDownload(id: number) {
    const code = codes.find((code) => code.codeId === id);
    if (code) {
      const response = await axios.get(
        apiURL + code.codeText + "&size=300x300",
        {
          responseType: "blob",
        }
      );
      // Create a temporary URL for the Blob object
      const url = URL.createObjectURL(response.data);

      // Create an anchor element dynamically
      const a = document.createElement("a");
      a.href = url;
      a.download = `qrcode-${code.title}.png`; // Set the filename for the downloaded image

      // Programmatically click the anchor element to trigger the download
      a.click();

      // Clean up by revoking the temporary URL
      URL.revokeObjectURL(url);
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
            <span className="text-danger">{errorTitle}</span>
            <div className="mb-3">
              <label>Code Title</label>
              <Input
                className="form-control"
                placeholder="Title"
                autoComplete="Title"
                value={codeTitle}
                onChange={(e) => {
                  setCodeTitle(e.target.value);
                  setErrorTitle("");
                }}
              />
            </div>
            <span className="text-danger">{errorText}</span>
            <div className="mb-3">
              <label>Code Text</label>
              <Input
                className="form-control"
                placeholder="Text"
                autoComplete="Text"
                value={codeText}
                onChange={(e) => {
                  setCodeText(e.target.value);
                  setErrorText("");
                }}
              />
            </div>
            {generatedCode ? (
              <div className="mb-3 d-flex flex-column">
                <label className="mb-2">Code</label>
                <img src={generatedCode} style={{ width: "50%" }} alt="N/A" />
              </div>
            ) : (
              <></>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={(e) => generateCode(e)}
              type="submit"
            >
              Generate code
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
                      <p className="mb-0 d-flex flex-column">
                        <span className="h4">Code title: {code.title}</span>
                        <span className="h4">Code text: {code.codeText}</span>
                      </p>
                      <div className="mb-3">
                        <img src={codesImages[index]} alt="N/A" />
                      </div>
                      <ButtonGroup aria-label="Basic example">
                        <Button
                          color="danger"
                          onClick={() => handleDelete(code.codeId)}
                        >
                          Delete Code
                        </Button>
                        <Button
                          color="primary"
                          onClick={() => handleDownload(code.codeId)}
                        >
                          Download Code
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
