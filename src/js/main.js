import '../styles/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import TimelinePage from './timelinePage';

document.addEventListener("DOMContentLoaded", ()=>{
    ReactDOM.render(<TimelinePage />, document.getElementById("react-container"));
});
