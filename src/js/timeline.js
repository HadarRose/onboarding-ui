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

    updateState(obj){
        this.setState({
            isLoaded: obj?.isLoaded,
            tweets: obj?.tweets,
            error: obj?.error
        });
    }

    render() {
        if(this.state.isLoaded && this.state.error){ // if loaded and an error, render error message
            console.error(this.state.error);
            return(
                <div className="error-message">
                    Something went wrong, please contact systems administrator.
                </div>
            );
        } else if(this.state.isLoaded){ // if loaded and no error, render a list of TweetBlock
            return(
                    this.state.tweets.map(t => (
                        <TweetBlock tweet={t}/>
                    ))
            );
        } else { // if still loading, render "Loading"
            return <div>Loading...</div>;
        }
    }
}