import { Card, Container,Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { Link, useNavigate } from 'react-router-dom';
import { GENEROCREATE_URL, LISTAMAIN_URL } from "../../navigation/Constants";
import { DeleteGeneros, GetListaGeneros } from "../../services/GeneroService";

const GeneroList = () => {
    const [listaGeneros, setListaGeneros] = useState([]);
    const navigate = useNavigate()
    const superuser = localStorage.getItem('is_superuser');

    useEffect(() => {
        if(superuser === "false"){
            navigate(LISTAMAIN_URL)
        }
        loadGenero();
    }, []);

    const loadGenero=()=>{
        GetListaGeneros().then((data)=>{
            setListaGeneros(data);
        });
    }
    const eliminarGenero = (id) => {
        if(window.confirm("¿Estas seguro que deseas eliminar este genero?")){
            DeleteGeneros(id).then(()=>{
                loadGenero();
            });
        }
    };

    return (
        <>
            <Menu/>
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
                                    <th>Editar</th>
                                    <th>Eliminar</th>
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
                                                <Link className="btn btn-primary" to={GENEROCREATE_URL+'/'+genero.id}>Editar</Link>
                                            </td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => {
                                                    eliminarGenero(genero.id);
                                                }}>Eliminar</button>
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
export  default GeneroList;