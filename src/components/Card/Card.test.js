import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Card from './Card';

Enzyme.configure({ adapter: new Adapter() });

describe('Card', () => {
    const  mockMovieData = {title: "Coco", 
                            id: 354912, 
                            poster: "https://image.tmdb.org/t/p/w500/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg", 
                            overview: "Despite his family’s baffling generations-old ban …ck the real story behind Miguel's family history."
                           };

    it('matches the snapshot', () => {
        const wrapper = shallow(<Card movieData={mockMovieData} key={mockMovieData.id} />);
        
        expect(wrapper).toMatchSnapshot();
    });
    
});