import React from 'react';
import { shallow } from 'enzyme';
import TimelinePage from '../src/js/timelinePage';

describe('dummy test', () =>{
    it('still dummy test', ()=>{
        const wrapper = shallow(<TimelinePage/>);
        expect(wrapper.find('div').length).toEqual(1);
    });
});