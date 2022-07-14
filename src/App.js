import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import axios from 'axios';

const App = () => { 
    const External = () => {
        axios.get(`https://tiniapi.herokuapp.com/url/${window.location.pathname}`)
        .then(res => window.location.replace(res.data[0].long_url))
        .catch((err) => alert("not a valid shortened url"))
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<External/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;