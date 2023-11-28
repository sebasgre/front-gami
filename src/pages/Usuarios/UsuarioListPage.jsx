import { Card, Container,Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { Link, useNavigate } from 'react-router-dom';
import { deleteUsuario, getListaUsuarios } from "../../services/UsuarioService";
import { USERCREATE_URL, LISTAMAIN_URL } from "../../navigation/Constants";

const UserList = () => {
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        loadPersonas();
    }, []);

    const loadPersonas=()=>{
        getListaUsuarios().then((data)=>{
            setListaUsuarios(data);
            data.map((usuario) => {
                if(usuario.username === localStorage.getItem('username')){
                    localStorage.setItem('is_superuser',usuario.is_superuser)
                    if(!usuario.is_superuser){
                        navigate(LISTAMAIN_URL);
                    }
                }
            });
        });
    }
    const eliminarUsuario = (id) => {
        if(window.confirm("¿Estas seguro que deseas eliminar este usuario?")){
            deleteUsuario(id).then(()=>{
                loadPersonas();
            });
        }
    };

    return (
        <>
            <Menu/>
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>User List</Card.Title>
                        <Card.Text>
                            This is the user list page.
                        </Card.Text>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Nombres</th>
                                    <th>Apellidos</th>
                                    <th>Correo</th>
                                    <th>Contraseña</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaUsuarios.map((usuario) => {
                                    return (
                                        <tr key={usuario.id}>
                                            <td>{usuario.username}</td>
                                            <td>{usuario.first_name}</td>
                                            <td>{usuario.last_name}</td>
                                            <td>{usuario.email}</td>
                                            <td>....</td>
                                            <td>
                                                <Link className="btn btn-primary" to={USERCREATE_URL+'/'+usuario.id}>Editar</Link>
                                            </td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => {
                                                    eliminarUsuario(usuario.id);
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
export  default UserList;