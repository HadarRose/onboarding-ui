import React from 'react';
import Timeline from './timeline';

export default class TimelinePage extends React.Component {
    getTimeline(){ // calls the timeline component's requestTimeline
        this.refs.timeline.requestTimeline();
    }

    render(){
        return(
            <div className="main-container">
                <div className="title-div">Lab for Hadar</div>
                <button id="timeline-button" onClick={() => this.getTimeline()} >Get Timeline</button> 
                <Timeline ref={"timeline"}/>
            </div>
        );
    }
}