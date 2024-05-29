import React, {useState} from 'react';
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";

function AddRecord(props) {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const handleTitleChange = e => {
        setTitle(e.target.value);
    };

    const handleTextChange = e => {
        setText(e.target.value);
    };

    const handleAddRecordSubmit = (event) => {

        event.preventDefault();
        recordPost();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else{
            props.handleClose();
        }
    };

    const recordPost = () => {
        fetch('https://cursova-spring-app-20240529185433.azuremicroservices.io/record/post', {
            method: 'Post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                SectionId: props.section.sectionId ,
                Title: title,
                Text: text,
            }),
        })
            .then(
                () => {
                    props.loadRecords();
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add new section</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleAddRecordSubmit}>
                    <Form.Group className="mb-2" controlId="formRecodTitle">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Title"
                            className="mb-2"
                        >
                            <Form.Control type="text" required onChange={handleTitleChange}/>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formRecordText">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Text"
                            className="mb-2"
                        >
                            <Form.Control as="textarea" rows={3} required onChange={handleTextChange}/>
                        </FloatingLabel>

                    </Form.Group>
                    <Button style={{marginRight: '1rem'}} variant="primary" type="submit">
                        Add new record
                    </Button>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddRecord;