import React, {useEffect, useState} from 'react';
import './main.css';
import Section from "../Section/section";
import Home from "../Home/home";
import SectionController from "../SectionControll/section_controller";

const Main = (props) => {

    const [sections, setSections] = useState([]);

    useEffect(() => { if (props.user !== null) loadSection()}, [props.user]);

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
                    setSections(result)
                },
                (error) => {
                    setSections([])
                    console.log(error)
                }
            )
    }

    switch (props.page) {

        case 0:
            return <div className='main-container'>
                <Home/>
            </div>
        case 1:
            return <div className='main-container'>
                {props.user === null
                    ? <p>Login to see notes in your personal notebook</p>
                    : <div>
                        <SectionController sections={sections} setSections={setSections} user={props.user} loadSection={loadSection}/>
                        {sections.map(section => <Section loadSection={loadSection} section={section}/>)}
                    </div>
                }
            </div>
        default:
            return <div className='main-container'></div>
    }
};

export default Main;