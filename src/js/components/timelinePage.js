import React from 'react';
import Timeline from './timeline';
import PostTweet from './postTweet';

export default class TimelinePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeTab: 'general'
        }
    }

    clickTab(key){
        this.setState({
            activeTab: key
        });
    }

    renderButton(key, tab){
        return (<button key={tab.id}
                className='tab'
                data-selected={this.state.activeTab == key}
                onClick={() => this.clickTab(key)}
                >{tab.title}</button>);
    }

    render(){  
        const TABS = {
            general: {
                id: 'general-timeline',
                title: 'General Timeline',
                render:  <Timeline key='default'/>
            },
            self: {
                id: 'self-timeline',
                title: 'User Timeline',
                render: <Timeline type='self' key='self'/>
            },
            post: {
                id: 'post-tweet',
                title: 'Post Tweet',
                render:  <PostTweet/>
            }
        };

        return(
            <div className="main-container">
                <div className="title-div">Lab for Hadar</div>
                <div className="tabs-container">
                    {
                        Object.entries(TABS).map(([key, tab]) =>( 
                            this.renderButton(key, tab)
                        ))
                    }
                </div>
                {
                    TABS[this.state.activeTab].render
                }
            </div>
        );
    }
}
