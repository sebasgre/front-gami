import { Button, Card, Container,Table, Alert, FormGroup, FormControl } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Form, Link, useNavigate } from 'react-router-dom';
import { JUEGOBUSCA_URL, JUEGOMAIN_URL } from "../../navigation/Constants";
import { GetListaGeneros } from "../../services/GeneroService";
import MenuNormal from "../../components/MenuNormal";
import { buscador } from "../../services/MainService";

const MainPage = () => {
    const [listaGeneros, setListaGeneros] = useState([]);
    const navigate = useNavigate()
    const [showAlertError, setShowAlertError] = useState(false)
    const [validated, setValidated] = useState(false);
    const [q, setQ] = useState("");

    useEffect(() => {
        loadGenero();
    }, []);

    const loadGenero=()=>{
        GetListaGeneros().then((data)=>{
            setListaGeneros(data);
        });
    }
    const onUserFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (isValid === true) {
            Buscador()
        }
    }
    const Buscador = () => {
        setShowAlertError(false);
        buscador({
            q
        })
            .then((data) => {
                console.log(data);
                if (data.length===0) {
                    setShowAlertError(true);
                    return;
                }
                localStorage.removeItem("listaJuegos");
                localStorage.setItem("listaJuegos", JSON.stringify(data));
                navigate(JUEGOBUSCA_URL);
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
            <MenuNormal/>
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>Genero List</Card.Title>
                        <Card.Text>
                            This is the genero list page.
                        </Card.Text>
                        <div>
                            {showAlertError && <Alert variant="danger">
                                Error al enviar enviar datos, por favor intente nuevamente
                            </Alert>}
                            <Form noValidate onSubmit={onUserFormSubmit} validated={validated}>
                                <FormGroup>
                                    <label>Nombres</label>
                                    <FormControl value={q} required
                                        onChange={(e) => {
                                            setQ(e.target.value);
                                        }} />
                                </FormGroup>
                                <div className="mt-3">
                                        <Button type="submit">Buscar</Button>
                                </div>
                            </Form>
                        </div>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Foto</th>
                                    <th>Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaGeneros.map((genero) => {
                                    return (
                                        <tr key={genero.id}>
                                            <td>{genero.nombre}</td>
                                            <td>
                                                <img src={genero.imagen} alt={genero.nombre} width="100px" height="100px"/>
                                            </td>
                                            <td>
                                                <Link className="btn btn-primary" to={JUEGOMAIN_URL+'/'+genero.id}>Ver Canciones</Link>
                                            </td>
                                            
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
export  default MainPage;