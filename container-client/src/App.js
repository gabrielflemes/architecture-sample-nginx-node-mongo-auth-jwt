//npx create-react-app myapp
//npm install react-router-dom
//npm install axios
import React, { useState } from 'react';
import Tasks from './tasks';
import Nav from './nav';
import Detail from './detail';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {


  return (
    <Router>
      <Nav />
      <div className='app'>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/tasks' component={Tasks} />
          <Route path='/detail' exact component={Tasks} />
          <Route path='/detail/:id' component={Detail} />
        </Switch>
      </div>
    </Router>

  );
};

const Home = () => {

  return (
    <div>Home</div>
  );
};


export default App;