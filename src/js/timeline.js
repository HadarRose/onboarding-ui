import React from 'react';
import TweetBlock from './tweetBlock';
import TimelineService from './timelineService';

export default class Timeline extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tweets: [], // tweets retrieved 
            isLoaded: false, // flags if request was loaded or not
            error: null, // error message
        };
        this.timelineService = new TimelineService(this);
    }

    componentDidMount() { // calls requestTimeline upon component being mounted
        this.requestTimeline();
    }

    requestTimeline(){ // requests tweets from back end
        this.setState({ // resets state
            tweets: [],
            isLoaded: false,
            error: null,
        });
        this.timelineService.makeRequest();
    }

    render() {
        if(this.state.isLoaded && this.state.error){ // if loaded and an error, render error message
            console.error(this.state.error);
            return(
                <div className="timeline-container">
                    <div className="error-message">
                        Something went wrong, please contact systems administrator.
                    </div>
                </div>   
            );
        } else if(this.state.isLoaded){ // if loaded and no error, render a list of TweetBlock
            return(
                <div className="timeline-container">
                    {this.state.tweets.map(t => (
                        <TweetBlock tweet={t}/>
                    ))}
                </div>
            );
        } else { // if still loading, render "Loading"
            return <div>Loading...</div>;
        }
    }
}