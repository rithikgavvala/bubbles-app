import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";
import ParentContainer from './components/ParentContainer';


const App: React.FC = () => {
  return (
    <Router>
        <Route  path='/' component={ParentContainer}/>
    </Router>


  );
}

export default App;
