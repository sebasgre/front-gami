import { Card, Container, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetJuegos } from "../../services/JuegoService";
import MenuNormal from "../../components/MenuNormal";

const DetallesJuegos = () => {
    const { id } = useParams("id");
    const [juego, setJuego] = useState("");
    const [creador, setCreador] = useState("");
    const [listaGeneros, setListaGeneros] = useState([]);

    useEffect(() => {
        GetJuegos(id).then((data) => {
            setJuego(data);
            setCreador(data.creador.username);
            setListaGeneros(data.genero);
        });
    }, [id]);

    const getGeneros = (generos) => {
        let generosString = "";
        generos.forEach((genero) => {
            generosString += genero + ", ";
        });
        return generosString;
    };

    return (
        <>
            <MenuNormal />
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>Juego List</Card.Title>
                        <Card.Text>
                            This is the juego list page.
                        </Card.Text>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Creador</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Foto</th>
                                    <th>Generos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {console.log(juego)}
                                <tr key={juego.id}>
                                    <td>{creador}</td>
                                    <td>{juego.nombre}</td>
                                    <td>{juego.precio} $</td>
                                    <td>
                                        <img src={juego.foto} alt={juego.nombre} width="100px" height="100px" />
                                    </td>
                                    <td>{getGeneros(listaGeneros)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default DetallesJuegos;