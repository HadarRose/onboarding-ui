import React from 'react';
import TweetsContainer from './tweetsContainer';

export default class Timeline extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            keyword: ''
        };
    }

    getTimeline(){ // calls the tweetsContainer's requestTimeline
        this.setState({keyword: ''}); // clear filter
        this.refs.timeline.requestTimeline();
    }

    filterTimeline(){ // calls the tweetsContainer's requestFilterTimeline
        console.debug(`Filtering timeline by keyword: ${this.state.keyword}`); 
        this.refs.timeline.filterTimeline(this.state.keyword);
    }

    // updates state to always equal the content of the input box
    handleInputChange(event){
        this.setState({
            keyword: event.target.value
        });
    }

    // checks if key pressed was 'enter', and if it was, filters the timeline
    handleInputKeyPress(event){
        if(event.keyCode == 13 && !this.state.keyword?.length == 0){
            this.filterTimeline();
        }
    }

    filterComponent() {
        return (
            <div className='filter-component'>
                <input 
                    placeholder='Filter by Keyword...'
                    className='filter-input'
                    value={this.state.keyword} 
                    onChange={(event) => this.handleInputChange(event)} 
                    onKeyDown={(event) => this.handleInputKeyPress(event)}
                />
                <button 
                    disabled={!this.state.keyword?.length || this.state.keyword == ''}
                    onClick={() => this.filterTimeline()} 
                    className='timeline-button'
                >Filter</button>
            </div>
        );
    }

    render() {
        let className = '';
        if(this.props?.type){
            className = 'timeline-container timeline-' + this.props.type;
        } else {
            className = 'timeline-container';
        }
        return(
            <div className={className}> 
                <div className='header'>
                    <h3>{this.props.title}</h3>
                </div>
                <button className="timeline-button" 
                    onClick={() => this.getTimeline()} 
                >Refresh</button>
                { !this.props?.type &&
                    this.filterComponent()
                } 
                <TweetsContainer type={this.props?.type} ref={'timeline'}/>
            </div>
        );
    }
}

Timeline.defaultProps = {
    title: 'General Timeline'
}