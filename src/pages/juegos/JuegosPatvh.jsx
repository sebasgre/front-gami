import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import { JUEGOLIST_URL, LISTAMAIN_URL } from "../../navigation/Constants";
import { PatchJuegos } from "../../services/JuegoService";



const JuegosPatch = () => {
const { id } = useParams("id");
const navigate = useNavigate()
const [validated, setValidated] = useState(false);
const [showAlertError, setShowAlertError] = useState(false)
const superuser = localStorage.getItem('is_superuser');
const [foto, setFoto] = useState('');

useEffect(() => {
    if (superuser === "false") {
        navigate(LISTAMAIN_URL)
    }
}, [id]);

const onUserFormSubmit = (e) => {
    const form = e.currentTarget;
    let isValid = form.checkValidity();
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);
    if (isValid===true) {
        patch()
    }
}
const patch = () => {
    setShowAlertError(false);
    PatchJuegos(id,{
        foto
    })
        .then((data) => {
            if (!data.id) {
                setShowAlertError(true);
                return;
            }
            navigate(JUEGOLIST_URL);
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
                        Formulario de Juegos
                    </Card.Title>
                    <div>
                        {showAlertError && <Alert variant="danger">
                            Error al enviar enviar datos, por favor intente nuevamente
                        </Alert>}
                        <Form noValidate onSubmit={onUserFormSubmit} validated={validated}>
                        <FormGroup>
                                    <label>Imagen</label>
                                    <FormControl type="file" required
                                        onChange={(e) => {
                                            setFoto(e.target.files[0]);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas una imagen</Form.Control.Feedback>
                                </FormGroup>
                            <div className="mt-3">
                                <Button type="submit">Guardar Juego</Button>
                            </div>
                        </Form>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    </>
);
};

export default JuegosPatch;