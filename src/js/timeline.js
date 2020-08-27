import React from 'react';
import TweetBlock from './tweetBlock';

export default class Timeline extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tweets: [], // tweets retrieved 
            isLoaded: false, // flags if request was loaded or not
            error: null, // error message
        };
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
        console.info('Requesting timeline from backend.'); 
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = (xhttp) => this.cleanTimeline(xhttp.currentTarget); // calls cleanTimeline instead
        xhttp.onerror = () => this.setState({ // changes state to loaded with error message if error has ocurred
            isLoaded: true,
            error: "A connection error has occurred"
        });
        xhttp.open("GET", "http://localhost:8080/api/1.0/twitter/timeline", true);
        xhttp.send();
    }

    cleanTimeline(xhttp){
        if(xhttp.readyState == XMLHttpRequest.DONE){ // if response is done loading
            console.debug("Request is DONE"); 
            if (xhttp.status !=200){ // if there was an error
                if(xhttp.status == 0){ 
                    return; // xhttp onerror will catch this error
                } else { // for uncaught errors, change the state's error and isLoaded
                    let message = "Bad status: " + xhttp.status;
                    this.setState({
                        isLoaded: true,
                        error: message
                    });
                }
            } else { // if there were no errors, make the response content the state's tweets property, and mark as loaded
                this.setState({
                    isLoaded: true,
                    tweets: JSON.parse(xhttp.responseText)
                });
            }
        }
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