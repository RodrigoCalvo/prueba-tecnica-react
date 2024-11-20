import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './modules/Login';
import { getCharactersList } from './api/characters';

function App() {
    useEffect(() => {
        getCharactersList(0).then((data) => console.log(data));
    });
    const [logged, setLogged] = useState(false);
    return <div className="App">{!logged && <Login setter={setLogged} />}</div>;
}

export default App;
