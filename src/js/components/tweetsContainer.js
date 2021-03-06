import React from 'react';
import TweetBlock from './tweetBlock';
import {getTimeline, getTimelineSelf, getTimelineFiltered} from '../services/timelineService';

export const DEFAULT_ERROR_MESSAGE = 'Something went wrong, please contact systems administrator.';

export default class TweetsContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tweets: [], // tweets retrieved 
            isLoaded: false, // flags if request was loaded or not
            error: null, // error message
        };
        if(this.props.type in this.TYPES){ // change type to specified type, if specified type exists
            this.serviceMethod = this.TYPES[this.props.type].serviceMethod;
            this.blockProps = this.TYPES[this.props.type].blockProps;
        } else {
            this.serviceMethod = this.TYPES['default'].serviceMethod; // set type to default
            this.blockProps = this.TYPES['default'].blockProps;
        }
    }

    get TYPES(){
        return {
            default: {
                serviceMethod: () => getTimeline(),
                blockProps: undefined
            },
            self: {
                serviceMethod:  () => getTimelineSelf().then(
                    (response) => {
                        if(response?.data?.length == 0){ // if no tweets, set error message to special error message
                            this.errorMessage = 'No tweets are available, post a tweet!';
                            throw new Error('No tweets');
                        } else {
                            return response;
                        }
                    }
                ),
                blockProps: {
                    handle: true
                }
            }
        };
    }

    componentDidMount() { // calls requestTimeline upon component being mounted
        this.requestTimeline();
    }

    requestTimeline(){ // requests tweets from back end
        // reset error message and isLoaded state
        this.errorMessage = undefined; 
        this.setState({
            isLoaded: false, 
        });
        this.serviceMethod().then( // uses the TYPE specific serviceMethod
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
        if(!this?.errorMessage){ // if an error message hasn't been defined, use default one
            this.errorMessage = DEFAULT_ERROR_MESSAGE;
        }
        this.setState({
            isLoaded: true,
            tweets: null,
            error: err
        });
    }

    filterTimeline(keyword){
        this.errorMessage = undefined; 
        this.setState({
            isLoaded: false, 
        });
        getTimelineFiltered(keyword).then(
            (response) => {
                if(response?.data?.length == 0){ // if no tweets, set error message to special error message
                    this.errorMessage = 'No tweets found for this keyword. Try a different word, or refresh the timeline!';
                    throw new Error('No tweets');
                } else {
                    return response;
                }
            }).then( // update timeline/error
            (response) => {
                this.updateTimeline(response);
            },
            (error) => {
                this.declareError(error);
            }
        );
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
                        <TweetBlock tweet={t} key={t.id} hiddenElements={this.blockProps}/>
                    ))
            );
        } else { // if still loading, render "Loading"
            content = <div>Loading...</div>;
        }
        return(
            <div className="tweets-container"> 
                {content}
            </div>
        );
    }
}