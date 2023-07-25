import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';


function NavbarElem() {
	const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));


  const handleLogout = () => {
		localStorage.clear();
		navigate("/")
	}

  return (
    <Navbar bg="light" expand="lg"  >
      <Container>
        <Navbar.Brand href="#home">Product<span style={{color:"#789"}}>Management</span> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto navbar-nav navbar-right">
           
         <Link to="/home/confirmpassword">Change Password</Link>

        
            <Nav.Link style={{fontSize :"25px" }}>{user.firstName}</Nav.Link>
            <button onClick={handleLogout} className ="btn btn-primary">Log out</button>
             
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarElem;