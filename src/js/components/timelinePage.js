import React from 'react';
import Timeline from './timeline';

export default class TimelinePage extends React.Component {
    render(){
        return(
            <div className="main-container">
                <div className="title-div">Lab for Hadar</div>
                <div className="timelines">
                    <Timeline/>
                    <Timeline type="self" title="Your Timeline"/>
                </div>
            </div>
        );
    }
}
