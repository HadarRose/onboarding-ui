import React from 'react';
import { postTweet } from '../services/timelineService';

export default class PostTweet extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            message: '',
            error: null,
            isLoaded: false,
            charCount: 0
        };
    }

    handleInputChange(value){
        this.setState({
            message: value,
            charCount: value.length
        });
    }

    postTweet(){
        this.setState({
            error: null
        });
        postTweet(this.state.message).then(
            (response) => {
                this.setState({
                    isLoaded: true
                });
            }, 
            (error) => {
                this.setState({
                    error: error,
                    isLoaded: true
                });
            }
        );

    }

    renderReport(){
        if(this.state.error && this.state.isLoaded){
            return (<span className='report error'>There was an issue posting your tweet.</span>);
        } else if(this.state.isLoaded){
            return(<span className='report success'>Successfully posted your tweet.</span>);
        }
    }

    render(){ 
        return (
            <div className='post-tweet-container'>
                <div className='post-text-area'>
                    <textarea
                        className='post-input'
                        value={this.state.message}
                        onChange={(event) => this.handleInputChange(event.target.value)}
                        maxLength="280"
                    />
                    <div className='char-count' data-count={this.state.charCount}>
                        {this.state.charCount}/280
                    </div>
                </div>
                <div className='post-controls'>
                    {
                        this.renderReport()
                    }
                    <button
                        className='post-button'
                        disabled={!this.state.message?.length || this.state.message == ''}
                        onClick={this.postTweet.bind(this)}
                    >Post</button>
                </div>
            </div>
        );
    }
}