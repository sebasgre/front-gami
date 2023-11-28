import {Container, Nav,Navbar, NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GENEROCREATE_URL, GENEROLIST_URL, HOME_URL, JUEGOCREATE_URL, JUEGOLIST_URL, USERCREATE_URL, USERLIST_URL } from '../navigation/Constants';
const Menu = ()=>{
    return (
        <Navbar bg="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">El Baisa srl</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to={HOME_URL}>Log Out</Link>
                        <NavDropdown title="Usuarios" id="basic-nav-dropdown">
                            <Link to={USERLIST_URL} className='dropdown-item' >Lista</Link>
                            <Link to={USERCREATE_URL} className='dropdown-item' >Crear</Link>
                        </NavDropdown>
                        <NavDropdown title="Juegos" id="basic-nav-dropdown">
                            <Link to={JUEGOLIST_URL} className='dropdown-item' >Lista</Link>
                            <Link to={JUEGOCREATE_URL} className='dropdown-item' >Crear</Link>
                        </NavDropdown>
                        <NavDropdown title="Generos" id="basic-nav-dropdown">
                            <Link to={GENEROLIST_URL} className='dropdown-item' >Lista</Link>
                            <Link to={GENEROCREATE_URL} className='dropdown-item' >Crear</Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;