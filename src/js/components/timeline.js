import React from 'react';
import TweetBlock from './tweetBlock';
import {promiseTimeline} from '../services/timelineService';

export default class Timeline extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tweets: [], // tweets retrieved 
            isLoaded: false, // flags if request was loaded or not
            error: null, // error message
        };
        this.errorMessage = "Something went wrong, please contact systems administrator.";
    }

    componentDidMount() { // calls requestTimeline upon component being mounted
        this.requestTimeline();
    }

    requestTimeline(){ // requests tweets from back end
        this.setState({
            isLoaded: false, 
        });
        promiseTimeline().then(
            (response) => {
                this.updateTimeline(response);
            },
            (error) => {
                this.declareError(error);
            }
        );
    }

    updateTimeline(response){
        console.debug(response);
        this.setState({
            isLoaded: true,
            tweets: response.data,
            error: null
        });
    } 

    declareError(err){
        console.error(err);
        this.setState({
            isLoaded: true,
            tweet: null,
            error: err
        });
    }

    render() {
        let content;
        if(this.state.isLoaded && this.state.error){ // if loaded and an error, render error message
            content = (
                <div className="error-message">
                    {this.errorMessage}
                </div>
            );
        } else if(this.state.isLoaded){ // if loaded and no error, render a list of TweetBlock
            content = (
                    this.state.tweets.map(t => (
                        <TweetBlock tweet={t}/>
                    ))
            );
        } else { // if still loading, render "Loading"
            content = <div>Loading...</div>;
        }
        return(
            <div className="timeline-container"> 
            {content}
            </div>
        );
    }
}