import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ParentContainer from './components/ParentContainer';
import GroupPage from './components/GroupPage';
import Header from './components/Header';

const routing = (
    <React.StrictMode>
        <ChakraProvider>
            <Header />

            <Router>
                <Switch>
                    <Route exact path="/" component={ParentContainer} />
                    <Route exact path="/group" component={GroupPage} />
                </Switch>
            </Router>
        </ChakraProvider>
    </React.StrictMode>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
