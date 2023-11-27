import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import { useNavigate,  } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/MainService";
import { USERLIST_URL } from "../navigation/Constants";

function HomePage() {
    localStorage.clear();
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const onUserFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (isValid===true) {
            doLogin();
        }
    }
    const doLogin = () => {
        setShowAlertError(false);
        login({
            username,
            password
        })
            .then((data) => {
                if (data.access === undefined) {
                    setShowAlertError(true);
                    return;
                }
                let token = data.access;
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                navigate(USERLIST_URL)
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setShowAlertError(true);
                } else {
                    console.log(error);
                }
            });
    }
    return (
        <>
            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>
                            Login
                        </Card.Title>
                        <div>
                            {showAlertError && <Alert variant="danger">
                                Error al enviar enviar datos, por favor intente nuevamente
                            </Alert>}
                            <Form noValidate onSubmit={onUserFormSubmit} validated={validated}>
                                <FormGroup>
                                    <label>Username</label>
                                    <FormControl value={username} required
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un UserName</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Contraseña</label>
                                    <FormControl value={password} required
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }} type="password" />
                                    <Form.Control.Feedback type="invalid">Ingresa un pasword válido</Form.Control.Feedback>
                                </FormGroup>

                                <div className="mt-3">
                                    <Button type="submit">Guardar persona</Button>
                                </div>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default HomePage;