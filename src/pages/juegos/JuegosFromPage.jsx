import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import { FormSelect } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import { GetJuegos, PostJuegos, UpdateJuegos } from "../../services/JuegoService";
import { JUEGOLIST_URL, LISTAMAIN_URL } from "../../navigation/Constants";
import { getListaUsuarios } from "../../services/UsuarioService";
import { GetListaGeneros } from "../../services/GeneroService";

const JuegosForm = () => {
    const { id } = useParams("id");
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false)
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [creador_id, setCreador_id] = useState('');
    const [generos, setGeneros] = useState([]);
    var generoselect = [];
    const [usuarios, setUsuarios] = useState([]);
    const superuser = localStorage.getItem('is_superuser');

    useEffect(() => {
        if (superuser === "false") {
            navigate(LISTAMAIN_URL)
        }
        loadUsuarios();
        loadGeneros();
        if (id !== undefined) {
            GetJuegos(id).then((data) => {
                setNombre(data.nombre);
                setPrecio(data.precio);
                setCreador_id(data.creador.id);

            });
        }
    }, [id]);

    const loadUsuarios = () => {
        getListaUsuarios().then((response) => {
            setUsuarios(response);
        });
    }
    const loadGeneros = () => {
        GetListaGeneros().then((response) => {
            setGeneros(response);
        });
    }
    const onUserFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        console.log(generoselect,"dgagawgfaw");
        if (isValid === true) {
            if (id === undefined) {
                createUser();
            } else {
                updateUser();
            }
        }
    }

    const createUser = () => {
        let genero =generoselect
        setShowAlertError(false);
        PostJuegos({
            nombre,
            precio,
            creador_id,
            genero
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

    const updateUser = () => {
        let genero =generoselect
        setShowAlertError(false);
        UpdateJuegos(id,{
            nombre,
            precio,
            creador_id,
            genero
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
    const onChangeUsuario = (e) => {
        setCreador_id(e.target.value);
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
                                    <label>Precio</label>
                                    <FormControl value={precio} required
                                        onChange={(e) => {
                                            setPrecio(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un nombre</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Dueño</label>
                                    <FormSelect onChange={onChangeUsuario} value={creador_id}>
                                        {usuarios.map((usuario) => {
                                            return <option key={usuario.id} value={usuario.id}>{usuario.username}</option>
                                        })}
                                    </FormSelect>
                                </FormGroup>
                                <FormGroup>
                                    <label>Generos</label>
                                    {generos.map((genero) => {
                                        return <div key={genero.id}>
                                            <input type="checkbox" onChange={(e) => {
                                                if(e.target.checked){
                                                    generoselect.push(genero.id);
                                                }else{
                                                    generoselect = generoselect.filter((genero_id) => genero_id !== genero.id);
                                                }
                                                console.log(generoselect);
                                            }} />
                                            <label>{genero.nombre}</label>
                                        </div>
                                    })}
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

export default JuegosForm;