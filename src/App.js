import './App.css';
import './Components/Navbar/navbar'
import Menu from "./Components/Navbar/navbar";
import React, {useState} from "react";
import Main from "./Components/Main/main";

function App() {

    const [user, setUser] = useState(null);
    const [page, setPage] = useState(0);

    return (
        <div className="App">
            <Menu user={user} setUser={setUser} setPage={setPage}/>
            <Main user={user} page={page}/>
        </div>
    );
}

export default App;
