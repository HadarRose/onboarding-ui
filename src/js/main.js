import '../css/index.css';
import { getTimeline } from './basicRequests.js';

document.addEventListener("DOMContentLoaded", ()=>{
    getTimeline();
    document.getElementById("timeline-button").onclick = function() {
        getTimeline();
    };
});