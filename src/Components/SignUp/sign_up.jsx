import React, {useState} from 'react';
import {Button, FloatingLabel, Form, Modal} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SignIn(props) {

    const [validated, setValidated] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState('')
    const [phone, setPhone] = useState('')

    const handleEmailChange = e => {
        setEmail(e.target.value);
    };
    const handleLoginChange = e => {
        setLogin(e.target.value);
    };

    const handlePhoneChange = e => {
        setPhone(e.target.value);
    };
    const handlePasswordChange = e => {
        setPassword(e.target.value);
    };

    const signUp = () => {
        fetch('https://cursova-spring-app-20240529185433.azuremicroservices.io/user/signup', {
            method: 'Post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Login: login,
                Email: email,
                Password: password,
                Phone: phone,
                BirthDate: startDate
            }),
        })
            .then(
                () => {

                },
                (error) => {
                    console.log(error);
                }
            )
    }

    const handleSungUp = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            signUp();
        }
        setValidated(true);
    };

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Sign in</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSungUp}>
                    <Form.Group className="mb-2" controlId="formLogin">
                        <FloatingLabel
                            label="Login"
                            className="mb-2"
                        >
                            <Form.Control required onChange={handleLoginChange}/>
                        </FloatingLabel>

                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formEmail">
                        <FloatingLabel
                            label="Email address"
                            className="mb-2"
                        >
                            <Form.Control required type="email" onChange={handleEmailChange}/>
                        </FloatingLabel>

                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formPassword">
                        <FloatingLabel
                            label="Password"
                            className="mb-2"
                        >
                            <Form.Control required type="password" onChange={handlePasswordChange}/>
                        </FloatingLabel>

                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formPhone">
                        <FloatingLabel
                            label="Phone"
                            className="mb-2"
                        >
                            <Form.Control type="phone" required onChange={handlePhoneChange}/>
                        </FloatingLabel>

                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBirthDate">
                        <Form.Label style={{marginRight: '1rem'}}>Birth Date</Form.Label>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
                    </Form.Group>
                    <Button type="submit" style={{marginRight: '1rem'}} variant="primary">
                        Sign Up
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