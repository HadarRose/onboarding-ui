import React from 'react';
import Timeline from './timeline';
import PostTweet from './postTweet';

export default class TimelinePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeTab: 'general'
        }
        const TABS = {
            general: {
                id: 'general-timeline',
                title: 'General Timeline',
                component:  <Timeline key='default'/>
            },
            self: {
                id: 'self-timeline',
                title: 'User Timeline',
                component: <Timeline type='self' key='self'/>
            },
            post: {
                id: 'post-tweet',
                title: 'Post Tweet',
                component:  <PostTweet/> // TODO rename to component 
            }
        };
        this.tabs = TABS;
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
        
        return(
            <div className="main-container">
                <div className="title-div">Lab for Hadar</div>
                <div className="tabs-container">
                    {
                        Object.entries(this.tabs).map(([key, tab]) =>( 
                            this.renderButton(key, tab)
                        ))
                    }
                </div>
                {
                    this.tabs[this.state.activeTab].component
                }
            </div>
        );
    }
}
