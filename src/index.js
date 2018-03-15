import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ImageList from './containers/ImageList';
import UpdateImage from './containers/UpdateImage';

ReactDOM.render((
  <Router>
    <div>
      <Route exact path="/" component={ImageList} />
      <Route path="/image/:imageId" component={UpdateImage} />
    </div>
  </Router>
), document.getElementById('root'));
