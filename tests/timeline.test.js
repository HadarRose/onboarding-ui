import React from 'react';
import { shallow } from 'enzyme';
import Timeline from '../src/js/components/timeline';
import { promiseTimeline } from '../src/js/services/timelineService';

jest.mock('../src/js/services/timelineService');
promiseTimeline.mockImplementation(() => {return dummyPromise});

var dummyPromise = new Promise(function(resolve, reject){});



describe('Timeline', ()=>{
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Timeline/>);
    });

    it('should render timeline-container', ()=>{
        expect(wrapper.find('div.timeline-container').length).toEqual(1);
    });

    it('should render loading if not loaded', ()=>{
        wrapper.setState({
            'isLoaded': false,
            'error': 'error',
            'tweets': [1, 2, 3, 4, 5]
        });
        expect(wrapper.text()).toEqual('Loading...');
    });

    it('should render error message if loaded with error', ()=>{
        wrapper.setState({
            'isLoaded': true,
            'error': 'error',
            'tweets': [1, 2, 3, 4, 5]
        });
        let content = wrapper.find('div.error-message');
        expect(content.length).toEqual(1);
        expect(wrapper.text()).toEqual(wrapper.instance().errorMessage);
    });

    it('should render tweet blocks if loaded w/o error', ()=>{
        wrapper.setState({
            'isLoaded': true,
            'error': null,
            'tweets': [1, 2, 3, 4, 5]
        });
        expect(wrapper.find('TweetBlock').length).toEqual(5);
    });
});