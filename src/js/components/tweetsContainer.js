import React from 'react';
import TweetBlock from './tweetBlock';
import {promiseTimeline, promiseTimelineSelf} from '../services/timelineService';

export const DEFAULT_ERROR_MESSAGE = 'Something went wrong, please contact systems administrator.';

/* HOW TO USE:
    To use the types, simply add a new type to the "TYPES" object. 
    Any fields that are not defined in your new type should be set to their default value in the constructor.
    You can also override a field by passing it as a property.
*/
const TYPES = {
    default: {}, 
    self: {
        serviceMethod: () => promiseTimelineSelf().then((response) => {
            if(response?.data?.length == 0){
                throw new Error('No tweets');
            } else {
                return response;
            }
        }),
        blockProps: {
            hiddenHandle: true
        },
        errorMessage: 'No tweets are available, post a tweet!'
    }
};

export default class TweetsContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tweets: [], // tweets retrieved 
            isLoaded: false, // flags if request was loaded or not
            error: null, // error message
        };
        let typeProperties = TYPES[this.props.type];

        /* HANDLING TYPE AND PROPERTIES */
        // choose service method
        if(this.props?.serviceMethod){
            this.serviceMethod = this.props.serviceMethod;
        } else if(typeProperties?.serviceMethod){ 
            this.serviceMethod = typeProperties.serviceMethod;
        } else {
            this.serviceMethod = () => promiseTimeline();
        }
        // choose block properties
        if(this.props?.blockProps){
            this.blockProps = this.props.blockProps;
        } else if(typeProperties?.blockProps){
            this.blockProps = typeProperties.blockProps;
        } else {
            this.blockProps = undefined;
        }
        // choose error message
        if(this.props?.errorMessage){
            this.errorMessage = this.props.errorMessage;
        } else if(typeProperties?.errorMessage){
            this.errorMessage = typeProperties.errorMessage;
        } else {
            this.errorMessage = DEFAULT_ERROR_MESSAGE;
        }
    }

    componentDidMount() { // calls requestTimeline upon component being mounted
        this.requestTimeline();
    }

    requestTimeline(){ // requests tweets from back end
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
        this.setState({
            isLoaded: true,
            tweets: null,
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
                        <TweetBlock tweet={t} additionalProperties={this.blockProps} key={t.id}/>
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

// sets the default type of timeline to 'default'
TweetsContainer.defaultProps = {
    type: 'default'
};