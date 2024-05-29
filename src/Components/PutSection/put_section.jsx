import React, {useState} from 'react';
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";

function PutSection(props) {
    const [title, setTitle] = useState(props.section.title);
    const [details, setDetails] = useState(props.section.details);

    const handleTitleChange = e => {
        e.preventDefault();
        setTitle(e.target.value);
    };

    const handleDetailsChange = e => {
        e.preventDefault();
        setDetails(e.target.value);
    };

    const handleAddRecordSubmit = (event) => {
        event.preventDefault();
        sectionPut();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else{
            props.handleClose();
        }
    };

    const sectionPut = () => {
        fetch('https://cursova-spring-app-20240529185433.azuremicroservices.io/section/put/' + props.section.sectionId, {
            method: 'Put',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                SectionId: props.section.sectionId,
                UserId: props.section.userId,
                Title: title,
                Details: details,
                Timestamp: props.section.timestamp
            }),
        })
            .then(
                () => {
                    props.loadSection();
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update section</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleAddRecordSubmit}>
                    <Form.Group className="mb-2" controlId="formSectionTitle">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Title"
                            className="mb-2"
                        >
                            <Form.Control
                                required
                                type="text"
                                onChange={handleTitleChange}
                                defaultValue={props.section.title}/>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formSectionDetails">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Deails"
                            className="mb-2"
                        >
                            <Form.Control
                                required
                                type="text"
                                onChange={handleDetailsChange}
                                defaultValue={props.section.details}/>
                        </FloatingLabel>

                    </Form.Group>
                    <Button style={{marginRight: '1rem'}} variant="primary" type="submit">
                        Update section
                    </Button>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default PutSection;