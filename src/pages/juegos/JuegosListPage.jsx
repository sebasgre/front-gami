import { Card, Container,Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { Link, useNavigate } from 'react-router-dom';
import { JUEGOCREATE_URL, JUEGOPATCH_URL,LISTAMAIN_URL } from "../../navigation/Constants";
import { DeleteJuegos, GetListaJuegos } from "../../services/JuegoService";

const JuegosList = () => {
    const [listaJuegos, setListaJuegos] = useState([]);
    const navigate = useNavigate()
    const superuser = localStorage.getItem('is_superuser');

    useEffect(() => {
        if(superuser === "false"){
            navigate(LISTAMAIN_URL)
        }
        loadJuego();
    }, []);

    const loadJuego=()=>{
        GetListaJuegos().then((data)=>{
            setListaJuegos(data);
        });
    }
    const eliminarJuego = (id) => {
        if(window.confirm("¿Estas seguro que deseas eliminar este juego?")){
            DeleteJuegos(id).then(()=>{
                loadJuego();
            });
        }
    };
    const getGeneros = (generos) => {
        let generosString = "";
        generos.forEach((genero) => {
            generosString += genero + ", ";
        });
        return generosString;
    };

    return (
        <>
            <Menu/>
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
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                    <th>Foto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaJuegos.map((juego) => {
                                    const generos = juego.genero
                                    return (
                                        <tr key={juego.id}>
                                            <td>{juego.creador.username}</td>
                                            <td>{juego.nombre}</td>
                                            <td>{juego.precio}</td>
                                            <td>
                                                <img src={juego.foto} alt={juego.nombre} width="100px" height="100px"/>
                                            </td>
                                            <td>{getGeneros(generos)}</td>
                                            <td>
                                                <Link className="btn btn-primary" to={JUEGOCREATE_URL+'/'+juego.id}>Editar</Link>
                                            </td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => {
                                                    eliminarJuego(juego.id);
                                                }}>Eliminar</button>
                                            </td>
                                            <td>
                                            <Link className="btn btn-primary" to={JUEGOPATCH_URL+'/'+juego.id}>Foto</Link>
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
export  default JuegosList;