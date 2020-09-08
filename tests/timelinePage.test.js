import React from 'react';
import { shallow } from 'enzyme';
import TimelinePage from '../src/js/components/timelinePage';
import Timeline from '../src/js/components/timeline';

describe('Timeline Page', () =>{
    let wrapper;
    
    beforeEach(() => wrapper = shallow(<TimelinePage/>));

    it('should render a main-container div', () => {
        expect(wrapper.find('div.main-container').length).toEqual(1);
    });

    it('should render a title-div div', () => {
        expect(wrapper.find('div.title-div').length).toEqual(1);
    });

    it('should render two Timeline components', () =>{
        expect(wrapper.find('Timeline').length).toEqual(2);
    });
});