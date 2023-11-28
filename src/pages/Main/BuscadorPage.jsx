import { Card, Container, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { DETALLESJUEGOMAIN_URL } from "../../navigation/Constants";
import MenuNormal from "../../components/MenuNormal"

const JuegoBuscaPage = () => {
    const juegos_id = JSON.parse(localStorage.getItem("listaJuegos"));
    
    return (
        <>
            <MenuNormal />
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>Juego List</Card.Title>
                        <Card.Text>
                            This is the Juego list page.
                        </Card.Text>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Foto</th>
                                    <th>Ver </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    juegos_id.map((genero) => {
                                        return (
                                            <tr key={genero.id}>
                                                <td>{genero.nombre}</td>
                                                <td>
                                                    <img src={"http://127.0.0.1:8000"+genero.foto} alt={genero.nombre} width="100px" height="100px" />
                                                </td>
                                                <td>
                                                    <Link className="btn btn-primary" to={DETALLESJUEGOMAIN_URL + '/' + genero.id}>Ver Juego</Link>
                                                </td>
    
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
export default JuegoBuscaPage;