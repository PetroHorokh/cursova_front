import React, {useState} from 'react';
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
import DatePicker from "react-datepicker";

function UserInfo(props) {
    const [validated, setValidated] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Sign in</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-2" controlId="formLogin">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Login"
                            className="mb-2"
                        >
                            <Form.Control defaultValue={props.user.login} disabled required/>
                        </FloatingLabel>

                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-2"
                        >
                            <Form.Control defaultValue={props.user.email} disabled required type="email"/>
                        </FloatingLabel>

                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formPhone">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Phone"
                            className="mb-2"
                        >
                            <Form.Control defaultValue={props.user.phone} disabled type="phone" required/>
                        </FloatingLabel>

                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBirthDate">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Birth Date"
                            className="mb-2"
                        >
                            <Form.Control defaultValue={props.user.birthDate} disabled required/>
                        </FloatingLabel>
                    </Form.Group>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default UserInfo;