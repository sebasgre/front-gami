import {
  Alert,
  Button,
  Card,
  Container,
  Form,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { HOME_URL } from "./navigation/Constants";
import { register } from "./services/MainService";

function RegisterPage() {
  localStorage.clear();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const onUserFormSubmit = (e) => {
    const form = e.currentTarget;
    let isValid = form.checkValidity();
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);
    if (isValid === true) {
      doRegister();
    }
  };
  const doRegister = () => {
    setShowAlertError(false);
    register({
      username,
      password,
      email,
    }).then((data) => {
      if (data.access === undefined) {
        setShowAlertError(true);
        return;
      }
      let token = data.access;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      navigate(HOME_URL);
    });
  };
  return (
    <Container>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Registro</Card.Title>
          <div>
            {showAlertError && (
              <Alert variant="danger">
                Error al enviar enviar datos, por favor intente nuevamente
              </Alert>
            )}
            <Form noValidate onSubmit={onUserFormSubmit} validated={validated}>
              <FormGroup>
                <label>Username</label>
                <FormControl
                  value={username}
                  required
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Necesitas un UserName
                </Form.Control.Feedback>
              </FormGroup>
              <FormGroup>
                <label>Contraseña</label>
                <FormControl
                  value={password}
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa un pasword válido
                </Form.Control.Feedback>
              </FormGroup>
              <FormGroup>
                <label>Email</label>
                <FormControl
                  value={email}
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa un email válido
                </Form.Control.Feedback>
              </FormGroup>

              <div className="mt-3">
                <Button variant="success" type="submit">
                  Guardar
                </Button>
              </div>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RegisterPage;
