import React, {useState} from 'react';
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";

function AddSection(props) {

    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');

    const handleTitleChange = e => {
        setTitle(e.target.value);
    };

    const handleDetailsChange = e => {
        setDetails(e.target.value);
    };

    const handleAddSectionSubmit = (event) => {
        sectionPost();
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();

        }
        else{
            props.handleClose();
        }
    };

    const loadSection = () =>{
        fetch('https://cursova-spring-app-20240529185433.azuremicroservices.io/section/' + props.user.userId, {
            method: 'Get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    props.setSections(result)
                },
                (error) => {
                    props.setSections([])
                    console.log(error)
                }
            )
    }

    const sectionPost = () => {
        fetch('https://cursova-spring-app-20240529185433.azuremicroservices.io/section/post', {
            method: 'Post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                UserId: props.user.userId ,
                Title: title,
                Details: details,
            }),
        })
            .then(
                () => {
                    loadSection();
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
                <Form onSubmit={handleAddSectionSubmit}>
                    <Form.Group className="mb-2" controlId="formSectionTitle">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Title"
                            className="mb-2"
                        >
                            <Form.Control type="text" required onChange={handleTitleChange}/>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formSectionDetails">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Details"
                            className="mb-2"
                        >
                            <Form.Control as="textarea" rows={3} required onChange={handleDetailsChange}/>
                        </FloatingLabel>

                    </Form.Group>
                    <Button style={{marginRight: '1rem'}} variant="primary" type="submit">
                        Add new section
                    </Button>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddSection;