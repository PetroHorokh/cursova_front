import React, {useState} from 'react';
import {Navbar, Container, Nav, NavDropdown, Button} from 'react-bootstrap';
import SignIn from "../SignIn/sign_in";
import SignUp from "../SignUp/sign_up";
import UserInfo from "../UserInfo/user_info";

const Menu = (props) => {

    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showUserInfo, setShowUserInfo] = useState(false);

    const handleLoginClose = () => setShowLogin(false);
    const handleLoginShow = () => setShowLogin(true);

    const handleSingUpClose = () => setShowSignUp(false);
    const handleSingUpShow = () => setShowSignUp(true);

    const handleUserInfoClose = () => setShowUserInfo(false);
    const handleUserInfoShow = () => setShowUserInfo(true);

    return (
        <Navbar bg="dark" data-bs-theme="dark" sticky="top" expand="lg">
            <Container>
                <Navbar.Brand>
                    Notebook project
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Item>
                            <Button onClick={function  (){
                                props.setPage(0)
                            }} variant="dark">Home</Button>
                        </Nav.Item>
                        <Nav.Item>
                            <Button onClick={function  (){
                                props.setPage(1)
                            }} variant="dark">Notebook</Button>
                        </Nav.Item>
                    </Nav>
                    <Nav>
                        <NavDropdown key='down-centered'
                                     id='dropdown-button-drop-down-centered'
                                     drop='down-centered'
                                     title={props.user !== null ? 'User: ' + props.user.login : 'User'}>

                            {props.user !== null
                                ?
                                <div>
                                    <NavDropdown.Item onClick={handleUserInfoShow}>Info</NavDropdown.Item>
                                    <UserInfo user={props.user} show={showUserInfo} handleClose={handleUserInfoClose}></UserInfo>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item onClick={ function(){ props.setUser(null); props.setPage(0) } }>Logout</NavDropdown.Item>
                                </div>
                                : <div>
                                    <NavDropdown.Item onClick={handleLoginShow}>Login</NavDropdown.Item>
                                    <SignIn setUser={props.setUser} show={showLogin} handleClose={handleLoginClose}></SignIn>
                                    <NavDropdown.Item onClick={handleSingUpShow}>Sign up</NavDropdown.Item>
                                    <SignUp user={props.user} show={showSignUp} handleClose={handleSingUpClose}></SignUp>
                                </div>}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;