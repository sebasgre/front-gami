import { Card, Container, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { DETALLESJUEGOMAIN_URL } from "../../navigation/Constants";
import MenuNormal from "../../components/MenuNormal";
import { GetListaJuegos } from "../../services/JuegoService";

const JuegoMainPage = () => {
    const { id } = useParams("id");
    const [listaGeneros, setListaGeneros] = useState([]);

    useEffect(() => {
        loadGenero();
    }, []);

    const loadGenero = () => {
        GetListaJuegos().then((data) => {
            setListaGeneros(data);
        });
    }
    return (
        <>
            <MenuNormal />
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>Genero List</Card.Title>
                        <Card.Text>
                            This is the genero list page.
                        </Card.Text>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Foto</th>
                                    <th>Ver</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaGeneros.map((genero) => {
                                    let generot = false;
                                    for (let i = 0; i < genero.genero.length; i++) {
                                        if (genero.genero[i] == id) {
                                            generot = true;
                                        }
                                    }
                                    if(generot == true){
                                    return (
                                        <tr key={genero.id}>
                                            <td>{genero.nombre}</td>
                                            <td>
                                                <img src={genero.foto} alt={genero.nombre} width="100px" height="100px" />
                                            </td>
                                            <td>
                                                <Link className="btn btn-primary" to={DETALLESJUEGOMAIN_URL + '/' + genero.id}>Ver Juego</Link>
                                            </td>

                                        </tr>
                                    );
                                    }
                                })}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
export default JuegoMainPage;