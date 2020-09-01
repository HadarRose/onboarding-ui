import React from 'react';
import { shallow } from 'enzyme';
import TweetBlock from '../src/js/tweetBlock';

describe('Tweet Block', () => {
    let wrapper;
    let dummyJSON = {
        'user': {
            'twitterHandle': 'twitter handle',
            'profileImageUrl': 'someurl',
            'name': 'name'
        },
        'id': '11111',
        'createdAt': new Date(),
        'message': 'message'
    }

    beforeEach(() => wrapper = shallow(<TweetBlock tweet={dummyJSON}/>));

    it('should render a tweet-block', () => {
        expect(wrapper.find('div.tweet-block').length).toEqual(1);
    });

    it('should render a user-div', () => {
        expect(wrapper.find('div.user-div').length).toEqual(1);
    });

    it('should render a message-div', () => {
        expect(wrapper.find('div.message-div').length).toEqual(1);
    });

    it('should correctly render user icon', () => {
        let icon = wrapper.find('img#user-icon');
        expect(icon.length).toEqual(1);
        expect(icon.props().src).toEqual(dummyJSON.user.profileImageUrl);
    });

    it('should correctly render username', () => {
        let username = wrapper.find('div.user-name');
        expect(username.length).toEqual(1);
        expect(username.text()).toEqual(dummyJSON.user.name);
    });

    it('should correctly render user handle', () => {
        let userHandle = wrapper.find('div.user-handle');
        expect(userHandle.length).toEqual(1);
        expect(userHandle.text()).toEqual(dummyJSON.user.twitterHandle);
    });

    it('should correctly render date', () => {
        let date = wrapper.find('div.date');
        expect(date.length).toEqual(1);
        let arrDate = date.text().split(" ");
        expect(arrDate.length).toEqual(2); // only 2 elements to date, (day and month).
    }); 

    it('should correctly render message', () => {
        let message = wrapper.find('a.message-link');
        expect(message.length).toEqual(1);
        expect(message.text()).toEqual(dummyJSON.message);
        expect(message.props().target).toEqual('_blank');
    });
});