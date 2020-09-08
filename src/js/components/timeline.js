import React from 'react';
import TweetsContainer from './tweetsContainer';

export default class Timeline extends React.Component {
    constructor(props){
        super(props);
        if(this.props?.type){
            this.className = 'timeline-container timeline-' + this.props.type;
        } else {
            this.className = 'timeline-container';
        }
    }

    getTimeline(){ // calls the timeline component's requestTimeline
        this.refs.timeline.requestTimeline();
    }

    render() {
        return(
            <div className={this.className}> 
                <div className='header'>
                    <h3>{this.props.title}</h3>
                </div>
                <button id="timeline-button" onClick={() => this.getTimeline()}>Refresh</button>
                <TweetsContainer type={this.props?.type} ref={'timeline'}/>
            </div>
        );
    }
}

Timeline.defaultProps = {
    title: 'General Timeline'
}