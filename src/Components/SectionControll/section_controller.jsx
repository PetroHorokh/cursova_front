import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button, Col, Form, NavDropdown, Row} from "react-bootstrap";
import AddSection from "../AddSection/add_section";

function SectionController(props) {

    const [showAddSection, setShowAddSection] = useState(false);
    const [filter, setFilter] = useState('');

    const handleFilterChange = e => {
        e.preventDefault();
        setFilter(e.target.value);
    };

    const handleFilterSubmit = (event) => {
        event.preventDefault();
        filterSections();
    };

    const filterSections = () => {
        fetch('https://cursova-spring-app-20240529185433.azuremicroservices.io/section/filter/' + (filter !== '' ? filter : 'All'), {
            method: 'Get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    props.setSections(result);
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    const handleAddSectionClose = () => setShowAddSection(false);
    const handleAddSectionShow = () => setShowAddSection(true);

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Item>
                            <Button onClick={function () { handleAddSectionShow() }} variant="dark">
                                Add Section
                            </Button>
                        </Nav.Item>
                        <AddSection setSections={props.setSections} user={props.user} show={showAddSection}
                                    handleClose={handleAddSectionClose}></AddSection>
                    </Nav>
                    <Nav>
                        <Form className="d-flex" onSubmit={handleFilterSubmit}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={handleFilterChange}
                            />
                            <Button type="submit" variant="dark">Search</Button>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default SectionController;