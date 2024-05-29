import {Button, Dropdown} from 'react-bootstrap';
import * as React from 'react';
import './section.css';
import Record from "../Record/record";
import {useEffect, useState} from "react";
import AddRecord from "../AddRecord/add_record";
import PutSection from "../PutSection/put_section";

function Section(props) {


    const [records, setRecords] = React.useState([])
    const [showAddRecord, setShowAddRecord] = useState(false);
    const [showUpdateSection, setShowUpdateSection] = useState(false);

    const handleAddRecordClose = () => setShowAddRecord(false);
    const handleAddRecordShow = () => setShowAddRecord(true);

    const handleUpdateSectionClose = () => setShowUpdateSection(false);
    const handleUpdateSectionShow = () => setShowUpdateSection(true);

    useEffect(() => {
        if (props.user !== null) loadRecords()
    }, [props.user]);

    const loadRecords = () => {
        fetch('https://cursova-spring-app-20240529185433.azuremicroservices.io/record/' + props.section.sectionId, {
            method: 'Get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setRecords(result)
                },
                (error) => {
                    setRecords([])
                    console.log(error)
                }
            )
    }

    const deleteSection = () => {
        fetch('https://cursova-spring-app-20240529185433.azuremicroservices.io/section/delete/' + props.section.sectionId, {
            method: 'Delete',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(
                () => {
                    props.loadSection()
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="dark" className={'toggle-text'}>
                { 'Title: ' + props.section.title + '; Details: ' + props.section.details}
            </Dropdown.Toggle>
            <Dropdown.Menu className={'toggle-menu'}>
                <div className={'dropdown-buttons-container'}>
                    <Button className={'dropdown-buttons'}
                            variant="dark"
                            onClick={function () {
                                handleUpdateSectionShow()
                            }}>Update section</Button>
                    <PutSection loadSection={props.loadSection} section={props.section} show={showUpdateSection}
                                handleClose={handleUpdateSectionClose}/>
                    <Button className={'dropdown-buttons'}
                            variant="dark"
                            onClick={deleteSection}>
                        Delete section
                    </Button>
                    <Button className={'dropdown-buttons'}
                            onClick={function () {
                                handleAddRecordShow()
                            }}
                            variant="dark"
                            section={props.section}>
                        Add new record
                    </Button>
                    <AddRecord loadRecords={loadRecords} section={props.section} show={showAddRecord}
                               handleClose={handleAddRecordClose}/>
                </div>
                <Record records={records} loadRecords={loadRecords}/>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default Section;