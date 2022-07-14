import React, { useState } from "react";
import axios from 'axios';
import linkIcon from './link.png'
import logo from './logo.svg'
import './index.css';

const Home = () => {

    const [state, setSate] = useState('')
    const [shortenedUrl, setShortenedUrl] = useState('')
    const [isValid, setIsValid] = useState(false)
    const [tooltipText, setTooltipText] = useState('Click to Copy')
    const [domainName, setDomainName] = useState('rebrand.ly')

    const handleUrlChange = (e) => {
        setSate(e.target.value)
    }

    const handleDomainChange = (e) => {
        setDomainName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(domainName)
        e.target.reset();
        setDomainName('rebrand.ly');
        setTooltipText('Click to Copy')
        if (domainName === 'rebrand.ly') {
            const headers = {
                "Content-Type": "application/json",
                "apikey": process.env.REACT_APP_API_KEY,
                "workspace": process.env.REACT_APP_WORKSPACE
            };
        
            const data = {
                destination: state,
                domain: { fullName: "rebrand.ly" }
            }
        
            const endpoint = "https://api.rebrandly.com/v1/links";
            if (state !== '') {
                axios.post(endpoint, data, { headers: headers })
                .then((res) => setShortenedUrl(res.data.shortUrl))
                .then(() => setIsValid(true))
                .catch((err) => err)
            } else alert('You need to paste the link first');
        } else {
            if (state !== '') {
                axios.post('https://tiniapi.herokuapp.com/url', {
                    "destination": state
                })
                // .then(res => console.log(`http://localhost:3004/${res.data.short_slug}`))
                .then(res => setShortenedUrl(`${window.location.origin}/${res.data.short_slug}`))
                .then(() => setIsValid(true))
                .catch((err) => err)
            } else alert('You need to paste the link first');
        }
        
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(shortenedUrl)
        .then(() => setTooltipText("Copied"))
        .catch(() => alert('Could not copy text'))
    }

    const handleHover = () => {
        setTooltipText('Click to Copy')
    }

    return (
        <div className="container">
            <header><img src={logo} className="logo" alt="logo" /> URL Shortener</header>
            <div className="input-container">
                <h2 className="sub-title">Paste the URL to be shortened</h2>
                <form className="input-form" onSubmit={e => handleSubmit(e)}>
                    <div className="url-input">
                        <label name="url">Enter URL</label>
                        <input name="url" autoFocus required type='url' onChange={e => handleUrlChange(e)} placeholder='example.com/a-very-long-slug'>
                        </input>
                    </div>
                    <div className="select-domain">
                        <label name="Select Domain">Select Domain</label>
                        <select className="inside-select" name="Select Domain" onChange={e => handleDomainChange(e)}>
                            <option value="rebrand.ly" selected>rebrand.ly</option>
                            <option value="custom">Custom domain</option>
                        </select>   
                    </div>
                    
                    <button type="submit"><img className="button-icon" src={linkIcon} alt="link icon" />
                    Shorten it</button>
                </form>
            </div>
            {isValid && 
                <div className="result-container">
                    <p>Your shortened URL is:</p>
                    <button 
                        tooltip={tooltipText}
                        tooltip-position="bottom" 
                        onClick={handleCopy}
                        onMouseEnter={handleHover}
                    >{shortenedUrl}</button>
                </div>
            }
        </div>
    );
}

export default Home;
