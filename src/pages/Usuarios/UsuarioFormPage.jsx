import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { USERLIST_URL,LISTAMAIN_URL } from "../../navigation/Constants";
import Menu from "../../components/Menu";
import { PostUser, UpdateUser, getUsuario } from "../../services/UsuarioService";
import { useEffect, useState } from "react";

const UserForm = () => {
    const { id } = useParams("id");
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false)
    const [username, setUsername] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const superuser = localStorage.getItem('is_superuser');

        useEffect(() => {
            if(superuser === "false"){
                navigate(LISTAMAIN_URL)
            }
            if(id !== undefined){
            getUsuario(id).then((data) => {
                setUsername(data.username);
                setFirst_name(data.first_name);
                setLast_name(data.last_name);
                setEmail(data.email);
            });
        }   
        }, [id]);

    const onUserFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (isValid===true) {
            if(id === undefined){
                createUser();
            }else{
            updateUser();
            }
        }
    }

    const createUser = () => {
        setShowAlertError(false);
        PostUser({
            username,
            first_name,
            last_name,
            email,
            password
        })
            .then((data) => {
                if (!data.id) {
                    setShowAlertError(true);
                    return;
                }
                navigate(USERLIST_URL);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setShowAlertError(true);
                } else {
                    console.log(error);
                }
            });
    }

    const updateUser = () => {
        setShowAlertError(false);
        UpdateUser(id,{
            username,
            first_name,
            last_name,
            email,
            password
        })
            .then((data) => {
                if (!data.id) {
                    setShowAlertError(true);
                    return;
                }
                navigate(USERLIST_URL);
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
            <Menu />
            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>
                            Formulario de Usuarios
                        </Card.Title>
                        <div>
                            {showAlertError && <Alert variant="danger">
                                Error al enviar enviar datos, por favor intente nuevamente
                            </Alert>}
                            <Form noValidate onSubmit={onUserFormSubmit} validated={validated}>
                                <FormGroup>
                                    <label>Nombres</label>
                                    <FormControl value={first_name} required
                                        onChange={(e) => {
                                            setFirst_name(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un nombre</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Apellidos</label>
                                    <FormControl value={last_name} required
                                        onChange={(e) => {
                                            setLast_name(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un apellido</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Username</label>
                                    <FormControl value={username} required
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un UserName</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Email</label>
                                    <FormControl value={email} required
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }} type="email" />
                                    <Form.Control.Feedback type="invalid">Ingresa un email válido</Form.Control.Feedback>
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
};

export default UserForm;