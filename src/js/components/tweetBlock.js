import React from 'react';

export default class TweetBlock extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
        let tweetLink = `https://twitter.com/${this.props.tweet.user.twitterHandle}/status/${this.props.tweet.id}`;
        let readableDate = new Date(this.props.tweet.createdAt);
        let dateArr = readableDate.toString().split(" ");
        let dateOut = dateArr[1] + " " + dateArr[2];
            return (
            <div className="tweet-block">
                <div className="user-div">
                    <img src={this.props.tweet.user.profileImageUrl} className="user-icon"></img>
                    <div className="user-name">
                        {this.props.tweet.user.name}
                    </div>
                    { !this.props?.hiddenElements?.handle &&
                        <div className="user-handle">
                            {this.props.tweet.user.twitterHandle}
                        </div>  
                    }              
                </div>
                <div className="message-div">
                    <div className="date">
                        {dateOut}
                    </div>
                    <a className="message-link" target="_blank" href={tweetLink}>
                        {this.props.tweet.message}
                    </a>
                </div>
            </div>
        );
    }
}
