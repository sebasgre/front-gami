import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { GENEROLIST_URL, LISTAMAIN_URL } from "../../navigation/Constants";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import { GetGeneros, PostGeneros, UpdateGeneros } from "../../services/GeneroService";

const GeneroForm = () => {
    const { id } = useParams("id");
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false)
    const [nombre, setNombre] = useState('');
    const [imagen, setImagen] = useState('');
    const superuser = localStorage.getItem('is_superuser');

        useEffect(() => {
            if(superuser === "false"){
                navigate(LISTAMAIN_URL)
            }
            if(id !== undefined){
            GetGeneros(id).then((data) => {
                setNombre(data.nombre);
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
        PostGeneros({
            nombre,
            imagen
        })
            .then((data) => {
                if (!data.id) {
                    setShowAlertError(true);
                    return;
                }
                navigate(GENEROLIST_URL);
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
        UpdateGeneros(id,{
            nombre,
            imagen
        })
            .then((data) => {
                if (!data.id) {
                    setShowAlertError(true);
                    return;
                }
                navigate(GENEROLIST_URL);
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
                            Formulario de Generos
                        </Card.Title>
                        <div>
                            {showAlertError && <Alert variant="danger">
                                Error al enviar enviar datos, por favor intente nuevamente
                            </Alert>}
                            <Form noValidate onSubmit={onUserFormSubmit} validated={validated}>
                                <FormGroup>
                                    <label>Nombres</label>
                                    <FormControl value={nombre} required
                                        onChange={(e) => {
                                            setNombre(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un nombre</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Imagen</label>
                                    <FormControl type="file" required
                                        onChange={(e) => {
                                            setImagen(e.target.files[0]);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas una imagen</Form.Control.Feedback>
                                </FormGroup>
                                <div className="mt-3">
                                    <Button type="submit">Guardar genero</Button>
                                </div>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default GeneroForm;