import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ParentContainer from './components/ParentContainer';
import GroupPage from './components/GroupPage';


const routing = (

<<<<<<< HEAD
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
=======
  <React.StrictMode>
  <ChakraProvider>
    <Router>
      <Switch>
        <Route exact  path='/' component={ParentContainer}/>
        <Route  exact path='/group' component={GroupPage}/>
        </Switch>

    </Router>



  </ChakraProvider>

</React.StrictMode>
)


ReactDOM.render(
  routing,
  document.getElementById('root')
>>>>>>> 395d5208db5191cea98e418caa8361e3d758f735
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
