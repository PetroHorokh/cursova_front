import React, {useState} from 'react';
import './sign_in.css';
import {Button, Form, Modal} from 'react-bootstrap';

function SignIn(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailChange = e => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = e => {
        setPassword(e.target.value);
    };

    const signIn = () => {
        fetch('https://cursova-spring-app-20240529185433.azuremicroservices.io/user/login', {
            method: 'Post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Email: email,
                Password: password
            }),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    props.setUser(result);
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Sign in</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
                    </Form.Group>
                    <Button style={{marginRight: '1rem'}} variant="primary" onClick={function () {
                        props.handleClose();
                        signIn();
                    }}>
                        Login
                    </Button>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default SignIn;