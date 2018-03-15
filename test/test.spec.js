import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ImageListRow from '../src/components/ImageListRow';
import UpdateImage from '../src/containers/UpdateImage';

describe('ImageListRow', () => {
  const props = {
      image: {
        artist: 'Patrick Smith',
        display_sizes: [{name: 'test'},{name: 'test'},{uri: '1.png'}],
        title: 'daniel test',
        id: '928305966'
      },
      index: 1,
      deleteItemListUpdate: function() {}
    };

  const wrapper = shallow(<ImageListRow {...props} />);

  it('ImageListRow renders', () => {
    expect(wrapper).to.exist;
  });

  it('renders 1 <tr> and 4 <td>s', () => {
    expect(wrapper.find('tr')).to.have.length(1);
    expect(wrapper.find('td')).to.have.length(4);
  });

  it('renders correct title', () => {
    expect(wrapper.find('td').at(1).text()).to.have.string('daniel test');
  });
})

describe('UpdateImage', () => {

  const wrapper = mount(
    <Router>
      <div>
        <Route component={UpdateImage} />
      </div>
    </Router>
  );

  it('UpdateImage renders', () => {
    expect(wrapper).to.exist;
  });

  it('renders 3 <input> and 1 <textarea> and 2<button>s', () => {
    expect(wrapper.find('input')).to.have.length(3);
    expect(wrapper.find('textarea')).to.have.length(1);
    expect(wrapper.find('button')).to.have.length(2);
  });
})
