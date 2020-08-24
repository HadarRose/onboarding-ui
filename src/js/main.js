import '../css/index.css';
import { getTimeline } from './basicRequests.js';

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("main-container").onload = getTimeline();
    document.getElementById("timeline-button").onclick = function() {
        getTimeline();
    };
});