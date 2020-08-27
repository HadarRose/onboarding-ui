import '../styles/index.scss';
import { getTimeline } from './basicRequests.js';
import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener("DOMContentLoaded", ()=>{
    getTimeline();
    document.getElementById("timeline-button").onclick = () => {
        getTimeline();
    };
    ReactDOM.render(helloElement, document.getElementById("react-hello"));

});

const helloElement = (
    <p>
        hello react!
    </p>
);
