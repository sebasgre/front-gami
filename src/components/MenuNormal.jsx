import {Container, Nav,Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HOME_URL, LISTAMAIN_URL } from '../navigation/Constants';
const MenuNormal = ()=>{
    return (
        <Navbar bg="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">El Baisa srl Empleados</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to={HOME_URL}>Log Out</Link>
                        <Link className="nav-link" to={LISTAMAIN_URL}>Lista Generos</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MenuNormal;