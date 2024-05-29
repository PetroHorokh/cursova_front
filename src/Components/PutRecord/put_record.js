import React, {useState} from 'react';
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";

function PutRecord(props) {
    const [title, setTitle] = useState(props.records[props.ind].title);
    const [text, setText] = useState(props.records[props.ind].title);

    const handleTitleChange = e => {
        e.preventDefault();
        setTitle(e.target.value);
    };

    const handleTextChange = e => {
        e.preventDefault();
        setText(e.target.value);
    };

    const handlePutRecordSubmit = (event) => {
        event.preventDefault();
        recordPut();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else{
            props.handleClose();
        }
    };

    const recordPut = () => {
        fetch('https://cursova-spring-app-20240529185433.azuremicroservices.io/record/put/' + props.records[props.ind].recordId, {
            method: 'Put',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                RecordId: props.records[props.ind].recordId,
                SectionId: props.records[props.ind].sectionId,
                Title: title,
                Text: text,
                Timestamp: props.records[props.ind].timestamp
            }),
        })
            .then(
                () => {
                    props.loadRecords();
                },
                (error) => {
                    console.log(title);
                    console.log(text);
                    console.log(error);
                }
            )
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handlePutRecordSubmit}>
                    <Form.Group className="mb-2" controlId="formRecordTitle">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Title"
                            className="mb-2"
                        >
                            <Form.Control
                                required
                                type="text"
                                onChange={handleTitleChange}
                                defaultValue={props.records[props.ind].title}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formRecordText">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Text"
                            className="mb-2"
                        >
                            <Form.Control
                                required
                                type="textarea"
                                onChange={handleTextChange}
                                defaultValue={props.records[props.ind].text}/>
                        </FloatingLabel>

                    </Form.Group>
                    <Button style={{marginRight: '1rem'}} variant="primary" type="submit">
                        Update record
                    </Button>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default PutRecord;